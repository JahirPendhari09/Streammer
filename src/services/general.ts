import axios from "axios"

export const getCustomVideos = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/anime?type=movie')
      if(response.data) {
        return response.data.data
      }
      return response
    } catch (err) {
      console.log('Error while getting Videos: ', err)
      return null
    }
}