import { store } from "./store";
import { makeAutoObservable, runInAction } from 'mobx';
import { Car, CarFormValues } from '../models/car';
import agent from '../api/agent'
import { ClientBasic } from "../models/client";
import { v4 as uuid } from 'uuid';

export default class CarStore {

    cars: Car[] = [];
    car: Car | undefined;
    editingCar = new CarFormValues();
    formCarState = false;
    clientsNames: ClientBasic[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setEditingCar = (id: string) => {
        this.editingCar = this.cars.filter(c => c.id === id)[0] as CarFormValues;
        this.setFormCar(true);
        console.log(this.editingCar);
    }

    setFormCar = (state: boolean) => {
        if (!state) {
            this.editingCar = new CarFormValues();
        }
        this.formCarState = state;
    }

    getClientName = (id: string) => {
        if (this.clientsNames.some(c => c.id === id)) {
            let client = this.clientsNames.filter(c => c.id === id)[0];
            return client.name;
        } else {
            return ' ';
        }
    }

    loadCar = async (id: string) => {
        try {
            const result = await agent.Cars.details(id);
            runInAction(() => {
                this.car = result
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadCars = async () => {
        try {
            const result = await agent.Cars.list();
            runInAction(() => {
                this.cars = result;
                this.setFormCar(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadClientsName = async () => {
        try {
            const result = await agent.Clients.listBasic();
            runInAction(() => {
                this.clientsNames = result;
            })
        } catch (error) {
            console.log(error);
        }
    }

    createCar = async (car: CarFormValues) => {
        try {
            car.id = uuid();
            await agent.Cars.create(car);
            runInAction(() => {
                this.cars.push(car as Car);
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateCar = async (car: CarFormValues) => {
        try {
            await agent.Cars.update(car);
            runInAction(() => {
                let index = this.cars.findIndex(c => c.id === car.id)
                this.cars[index] = car as Car;
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteCar = async (id: string) => {
        try {
            await agent.Cars.delete(id);
            runInAction(() => {
                this.cars = this.cars.filter(c => !(c.id === id))
            })
        } catch (error) {
            console.log(error);
        }
    }
}