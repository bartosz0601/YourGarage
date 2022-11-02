import { store } from "./store";
import { makeAutoObservable, runInAction } from 'mobx';
import { Car } from '../models/car';
import agent from '../api/agent'

export default class CarStore { 
    
    cars: Car[] = [];
    car: Car | undefined;

    constructor() {
        makeAutoObservable(this);
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
            })
        } catch (error) { 
            console.log(error);
        }
    }
}