import axios, { AxiosResponse } from 'axios';
import { Car, CarFormValues } from '../models/car';
import { Client, ClientBasic, ClientFormValues } from '../models/client';
import { Service, ServiceFormValues } from '../models/service';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Services = {
    list: () => requests.get<Service[]>('/services'),
    create: (service: ServiceFormValues) => requests.post<Service>('/services/', service),
    update: (service: ServiceFormValues) => requests.put<Service>('/services/' + service.id, service),
    delete: (id: String) => requests.del<Service>('/services/' + id),
}

const Clients = {
    get: (id: string) => requests.get<Client>('/clients/' + id),
    list: () => requests.get<Client[]>('/clients'),
    listBasic: () => requests.get<ClientBasic[]>('/clients/basic'),
    create: (client: ClientFormValues) => requests.post<void>('/clients/', client),
    update: (client: ClientFormValues) => requests.put<void>('/clients/' + client.id, client),
    delete: (id: string) => requests.del<void>('/clients/' + id)
}

const Cars = {
    list: () => requests.get<Car[]>('/cars'),
    details: (id: string) => requests.get<Car>('/cars/' + id),
    create: (car: CarFormValues) => requests.post<void>('/cars/', car),
    update: (car: CarFormValues) => requests.put<void>('/cars/' + car.id, car),
    delete: (id: string) => requests.del<void>('/cars/' + id),
}

const agent = {
    Services,
    Clients,
    Cars
}

export default agent;