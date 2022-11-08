import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ModalContainer from '../../common/modals/ModalContainer';
import CarDetails from '../../features/cars/CarDetails';
import CarsPage from '../../features/cars/CarsPage';
import ClientPage from '../../features/clients/ClientPage';
import HomePage from '../../features/home/HomePage';
import ServicesPage from '../../features/services/ServicesPage';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <ModalContainer />
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/cars' element={<CarsPage />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/clients' element={<ClientPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
