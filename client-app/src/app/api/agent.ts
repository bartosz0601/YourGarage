import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Car, CarFormValues } from '../models/car';
import { Client, ClientBasic, ClientFormValues } from '../models/client';
import { PaginatedResult } from '../models/pagination';
import { Service, ServiceFormValues } from '../models/service';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    await sleep(1000);

    //Dodatnie informacji o pagination w odpowiedzi z serwera
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            toast.error('not found');
            window.location.replace('http://localhost:3000/not-found'); // przeładowuje całą strone 
            break;
        case 500:
            toast.error('server error');
            break;
    }
    return Promise.reject(error);
});

const requests = {
    get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Services = {
    get: (id: string) => requests.get<Service>('/services/' + id),
    list: (params: URLSearchParams) => requests.get<PaginatedResult<Service[]>>('/services', params),
    statistics: (params: URLSearchParams) => requests.get<Number[]>('services/statistics', params),
    create: (service: ServiceFormValues) => requests.post<Service>('/services/', service),
    update: (service: ServiceFormValues) => requests.put<Service>('/services/' + service.id, service),
    delete: (id: String) => requests.del<Service>('/services/' + id),
}

const Clients = {
    get: (id: string) => requests.get<Client>('/clients/' + id),
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Client[]>>('/clients', { params }).then(responseBody),
    listBasic: () => requests.get<ClientBasic[]>('/clients/basic'),
    amount: () => requests.get<Number>('/clients/amount'),
    create: (client: ClientFormValues) => requests.post<void>('/clients/', client),
    update: (client: ClientFormValues) => requests.put<void>('/clients/' + client.id, client),
    delete: (id: string) => requests.del<void>('/clients/' + id)
}

const Cars = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Car[]>>('/cars', { params }).then(responseBody),
    details: (id: string) => requests.get<Car>('/cars/' + id),
    amount: () => requests.get<Number>('/cars/amount'),
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