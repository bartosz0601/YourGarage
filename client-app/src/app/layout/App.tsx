import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import CarDetails from '../../features/cars/CarDetails';
import CarsList from '../../features/cars/CarsList';
import ClientsList from '../../features/clients/ClientsList';
import HomePage from '../../features/home/HomePage';
import ServicesList from '../../features/services/ServicesList';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/services' element={<ServicesList />} />
          <Route path='/cars' element={<CarsList />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/clients' element={<ClientsList/>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
