import './App.scss'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from '@/routes'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {initSocketListeners} from "@/middleware/socketMiddleware";
import {useStore} from "react-redux";

function App() {
  const store = useStore();
  useEffect(() => {
    initSocketListeners(store);
  }, [store]);

  return (
    <BrowserRouter>
      <AppRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  )
}

export default App
