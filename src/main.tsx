import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import './index.css';
import "tailwindcss";
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext.tsx';


createRoot(document.getElementById('root')!).render(
  <Provider store = {store}>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </Provider>,
)
