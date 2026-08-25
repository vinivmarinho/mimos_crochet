import './App.css'
// BrowserRouter => Componente que habilita o sistema de rotas na aplicação*
// Routes => É como um container que guarda as rotas
// Route => Representa uma rota específica
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/cadastro" element={<Register />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App
