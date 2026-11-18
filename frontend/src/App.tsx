import './App.css'
// BrowserRouter => Componente que habilita o sistema de rotas na aplicação*
// Routes => É como um container que guarda as rotas
// Route => Representa uma rota específica
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin/Admin';
import AdminRoute from './components/AdminRoute';
import CatalogPage from './pages/CatalogPage/Catalog';
import Orders from './pages/Orders/Orders';
function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/cadastro"
          element={<Register />}>
        </Route>

        <Route
          path="/login"
          element={<Login />}>

        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <Admin />

            </AdminRoute>
          }>
        </Route>

        <Route
          path="/catalog"
          element={
            <CatalogPage />
          }
        >

        </Route>
        <Route
          path="/pedidos"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        >
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App
