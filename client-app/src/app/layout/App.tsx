import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import ModalContainer from '../../common/modals/ModalContainer';
import CarDetails from '../../features/cars/CarDetails';
import CarsPage from '../../features/cars/CarsPage';
import ClientPage from '../../features/clients/ClientPage';
import NotFound from '../../features/errors/NotFound';
import HomePage from '../../features/home/HomePage';
import StartPage from '../../features/home/StartPage';
import ServiceForm from '../../features/services/ServiceForm';
import ServicesPage from '../../features/services/ServicesPage';
import CommonStore from '../stores/commonStore';
import { useStore } from '../stores/store';
import UserStore from '../stores/userStore';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

export default observer(function App() {
  const { userStore, commonStore } = useStore();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        setLoading(true);
      });
    } else {
      setLoading(true);
    }
  }, [commonStore, userStore])

  if (!loading) {
    return (
      <Dimmer active={true}>
        <Loader content={"Loading"} />
      </Dimmer >)
  }

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />

      {userStore.isLoggedIn && <NavBar />}

      {/* <Container style={{ marginTop: "100px" }}> */}
      <Container>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/home' element={<PrivateRoute><HomePage /> </PrivateRoute>} />
          <Route path='/services' element={<PrivateRoute><ServicesPage /> </PrivateRoute>} />
          <Route path='/createService' element={<PrivateRoute><ServiceForm /> </PrivateRoute>} />
          <Route path='/editService/:id' element={<PrivateRoute><ServiceForm /> </PrivateRoute>} />
          <Route path='/cars' element={<PrivateRoute><CarsPage /></PrivateRoute >} />
          <Route path='/cars/:id' element={<PrivateRoute><CarDetails /> </PrivateRoute >} />
          <Route path='/clients' element={<PrivateRoute><ClientPage /></PrivateRoute >} />
          <Route path='/not-found' element={<PrivateRoute><NotFound /></PrivateRoute >} />
          <Route path='*' element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
})

//export default App;
