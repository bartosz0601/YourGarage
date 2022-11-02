import axios, { AxiosResponse } from 'axios';
import { Car} from '../models/car';
import { Client } from '../models/client';
import { Service } from '../models/service';


axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Services = {
    list: () => requests.get<Service[]>('/services')
}

const Clients = {
    list: () => requests.get<Client[]>('/clients')
}

const Cars = {
    list: () => requests.get<Car[]>('/cars'),
    details: (id: string) => requests.get<Car>('/cars/' + id)
}

const agent = {
    Services,
    Clients,
    Cars
}

export default agent;