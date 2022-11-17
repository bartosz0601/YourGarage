import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ModalContainer from '../../common/modals/ModalContainer';
import CarDetails from '../../features/cars/CarDetails';
import CarsPage from '../../features/cars/CarsPage';
import ClientPage from '../../features/clients/ClientPage';
import NotFound from '../../features/errors/NotFound';
import HomePage from '../../features/home/HomePage';
import ServiceForm from '../../features/services/ServiceForm';
import ServicesPage from '../../features/services/ServicesPage';
import NavBar from './NavBar';



function App() {
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/createService' element={<ServiceForm />} />
          <Route path='/editService/:id' element={<ServiceForm />} />
          <Route path='/cars' element={<CarsPage />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/clients' element={<ClientPage />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
