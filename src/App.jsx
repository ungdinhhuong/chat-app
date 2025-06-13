import './App.scss'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './routes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  toast("Wow so easy!");
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
