// Styles and libs
import './App.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout.jsx';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.js';
// Pages
/******
   * ESTRUCTURA DE PÁGINAS:
     * Homepage "/"
    ** Menu Carta comida - Opciones navegación "/food"
     * Menu Carta comida - Opciones abiertas "/food" -> rendered component
    ** Menu Carta bebida - Opciones navegación "/drinks"
     * Menu Carta bebida - Opciones abiertas "/drinks" -> rendered component
     * Pedido, whishlist - con local-storage o Redux "/order"
     * Contacto y Reservas -  "/contact"
    ** Sobre nosotros y Eventos, newsletter, ofertas - "/about"
     * Tarjeta regalo - "/about" -> rendered component
     * Cupon fidelización - "/about" -> rendered component
    ** Area Personal - "/cms"
     * SignIn - "/crm" -> rendered component
     * SignUp - "/crm" -> rendered component
     * Users - "/crm" -> rendered component
     * Users CRUD - "/crm" -> rendered component
     * Products - "/crm" -> rendered component
     * Products CRUD - "/crm" -> rendered component
******/
import Homepage from './pages/Homepage.jsx';
import About from './pages/About.jsx';
import Order from './pages/Order.jsx';
import Drinks from './features/products/pages/Drinks.jsx';
import Foods from './features/products/pages/Foods.jsx';
import AreaCMS from './pages/AreaCMS.jsx';
import SignUpForm from './features/users/components/SignUpForm.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route index element={<Homepage />}/>
        <Route path="home" element={<Homepage />}/>
        <Route path="about" element={<About />}/>
        <Route path="order" element={<Order />}/>
        <Route path="drinks" element={<Drinks />}/>
        <Route path="foods" element={<Foods />}/>
        <Route path="cms" element={<AreaCMS />}/>
        <Route path="signup" element={<SignUpForm />}/>
    </Route>
  ),
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;