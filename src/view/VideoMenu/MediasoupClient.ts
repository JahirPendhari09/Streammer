import * as mediasoupClient from 'mediasoup-client';

class MediasoupService {
  constructor() {
    this.device = null;
    this.sendTransport = null;
    this.recvTransport = null;
    this.producers = new Map();
    this.consumers = new Map();
    this.socket = null;
  }

  async init(socket, rtpCapabilities) {
    try {
      this.socket = socket;
      this.device = new mediasoupClient.Device();
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Mediasoup device loaded');
      return true;
    } catch (error) {
      console.error('Error loading device:', error);
      throw error;
    }
  }

  async createSendTransport() {
    if (this.sendTransport) {
      return this.sendTransport;
    }

    return new Promise((resolve, reject) => {
      this.socket.emit('create-transport', { direction: 'send' }, async (data) => {
        if (data.error) {
          console.error('Error creating send transport:', data.error);
          return reject(new Error(data.error));
        }

        try {
          this.sendTransport = this.device.createSendTransport({
            id: data.id,
            iceParameters: data.iceParameters,
            iceCandidates: data.iceCandidates,
            dtlsParameters: data.dtlsParameters,
          });

          this.sendTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
              await this.connectTransport(data.id, dtlsParameters);
              callback();
            } catch (error) {
              console.error('Error in send transport connect:', error);
              errback(error);
            }
          });

          this.sendTransport.on('produce', async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
              const { id } = await this.produce(data.id, kind, rtpParameters, appData);
              callback({ id });
            } catch (error) {
              console.error('Error in send transport produce:', error);
              errback(error);
            }
          });

          this.sendTransport.on('connectionstatechange', (state) => {
            console.log('Send transport state:', state);
          });

          resolve(this.sendTransport);
        } catch (error) {
          console.error('Error creating send transport:', error);
          reject(error);
        }
      });
    });
  }

  async createRecvTransport() {
    if (this.recvTransport) {
      return this.recvTransport;
    }

    return new Promise((resolve, reject) => {
      this.socket.emit('create-transport', { direction: 'recv' }, async (data) => {
        if (data.error) {
          console.error('Error creating recv transport:', data.error);
          return reject(new Error(data.error));
        }

        try {
          this.recvTransport = this.device.createRecvTransport({
            id: data.id,
            iceParameters: data.iceParameters,
            iceCandidates: data.iceCandidates,
            dtlsParameters: data.dtlsParameters,
          });

          this.recvTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
              await this.connectTransport(data.id, dtlsParameters);
              callback();
            } catch (error) {
              console.error('Error in recv transport connect:', error);
              errback(error);
            }
          });

          this.recvTransport.on('connectionstatechange', (state) => {
            console.log('Recv transport state:', state);
          });

          resolve(this.recvTransport);
        } catch (error) {
          console.error('Error creating recv transport:', error);
          reject(error);
        }
      });
    });
  }

  connectTransport(transportId, dtlsParameters) {
    return new Promise((resolve, reject) => {
      this.socket.emit('connect-transport', { transportId, dtlsParameters }, (data) => {
        if (data.error) {
          console.error('Error connecting transport:', data.error);
          return reject(new Error(data.error));
        }
        resolve();
      });
    });
  }

  produce(transportId, kind, rtpParameters, appData) {
    return new Promise((resolve, reject) => {
      this.socket.emit('produce', { transportId, kind, rtpParameters, appData }, (data) => {
        if (data.error) {
          console.error('Error producing:', data.error);
          return reject(new Error(data.error));
        }
        resolve(data);
      });
    });
  }

  async produceWebcam(stream) {
    try {
      if (!this.sendTransport) {
        await this.createSendTransport();
      }

      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error('No video track found');
      }

      if (!this.producers.has('video')) {
        const producer = await this.sendTransport.produce({
          track: videoTrack,
          appData: { screen: false }
        });
        this.producers.set('video', producer);
        console.log('Webcam producer created:', producer.id);
        return producer;
      }
    } catch (error) {
      console.error('Error producing webcam:', error);
      throw error;
    }
  }

  async produceMicrophone(stream) {
    try {
      if (!this.sendTransport) {
        await this.createSendTransport();
      }

      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        throw new Error('No audio track found');
      }

      if (!this.producers.has('audio')) {
        const producer = await this.sendTransport.produce({
          track: audioTrack,
          appData: { screen: false }
        });
        this.producers.set('audio', producer);
        console.log('Microphone producer created:', producer.id);
        return producer;
      }
    } catch (error) {
      console.error('Error producing microphone:', error);
      throw error;
    }
  }

  async stopProducer(kind) {
    const producer = this.producers.get(kind);
    if (producer) {
      producer.close();
      this.producers.delete(kind);
      console.log(`${kind} producer stopped`);
    }
  }

  async consume(producerId) {
    try {
      if (!this.recvTransport) {
        await this.createRecvTransport();
      }

      return new Promise((resolve, reject) => {
        this.socket.emit('consume', {
          producerId,
          rtpCapabilities: this.device.rtpCapabilities
        }, async (data) => {
          if (data.error) {
            console.error('Error consuming:', data.error);
            return reject(new Error(data.error));
          }

          try {
            const consumer = await this.recvTransport.consume({
              id: data.id,
              producerId: data.producerId,
              kind: data.kind,
              rtpParameters: data.rtpParameters,
            });

            this.consumers.set(consumer.id, consumer);

            // Resume consumer
            this.socket.emit('resume-consumer', { consumerId: consumer.id }, (response) => {
              if (response.error) {
                console.error('Error resuming consumer:', response.error);
              } else {
                console.log('Consumer resumed:', consumer.id);
              }
            });

            resolve({ consumer, appData: data.appData });
          } catch (error) {
            console.error('Error creating consumer:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error in consume:', error);
      throw error;
    }
  }

  getConsumer(consumerId) {
    return this.consumers.get(consumerId);
  }

  closeConsumer(consumerId) {
    const consumer = this.consumers.get(consumerId);
    if (consumer) {
      consumer.close();
      this.consumers.delete(consumerId);
      console.log('Consumer closed:', consumerId);
    }
  }

  cleanup() {
    console.log('Cleaning up mediasoup service...');
    
    // Close all producers
    for (const producer of this.producers.values()) {
      producer.close();
    }
    this.producers.clear();

    // Close all consumers
    for (const consumer of this.consumers.values()) {
      consumer.close();
    }
    this.consumers.clear();

    // Close transports
    if (this.sendTransport) {
      this.sendTransport.close();
      this.sendTransport = null;
    }
    if (this.recvTransport) {
      this.recvTransport.close();
      this.recvTransport = null;
    }

    this.device = null;
    this.socket = null;
  }
}

export default new MediasoupService();