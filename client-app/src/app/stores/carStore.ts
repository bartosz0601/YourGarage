import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { Car, CarFormValues } from '../models/car';
import agent from '../api/agent'
import { ClientBasic } from "../models/client";
import { v4 as uuid } from 'uuid';
import { Pagination, PagingParams } from "../models/pagination";

export default class CarStore {

    loadingInitial = false;
    carsRegister = new Map<string, Car>();
    car: Car | undefined;
    editingCar = new CarFormValues();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    searchParam: string = "";

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => { return this.searchParam },
            () => {
                this.pagingParams = new PagingParams();
                this.carsRegister.clear();
                this.loadCars();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setSearchParam = (text: string) => {
        this.searchParam = text;
    }

    initCars = () => {
        this.pagingParams = new PagingParams();
        this.carsRegister.clear();
        this.searchParam = "";
    }

    get cars() {
        return Array.from(this.carsRegister.values()).sort((a, b) => {
            let abrand = a.brand.toUpperCase();
            let bbrand = b.brand.toUpperCase();
            if (abrand > bbrand) { return 1 }
            if (abrand < bbrand) { return -1 }
            return 0;
        });
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('searchParam', this.searchParam);
        return params;
    }

    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }

    setEditingCar = (id: string) => {
        this.editingCar = this.carsRegister.get(id)!;
    }

    initFormCar = (clientId?: string) => {
        this.editingCar = new CarFormValues();
        if (clientId) this.editingCar.clientId = clientId;
    }

    getClientName = (id: string, clientsNames: ClientBasic[]) => {
        if (clientsNames.some(c => c.id === id)) {
            let client = clientsNames.filter(c => c.id === id)[0];
            return client.name;
        } else {
            return ' ';
        }
    }

    loadCar = async (id: string) => {
        this.loadingInitial = true;
        try {
            const result = await agent.Cars.details(id);
            runInAction(() => {
                this.car = result
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadCars = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Cars.list(this.axiosParams);
            runInAction(() => {
                result.data.forEach(x => {
                    this.carsRegister.set(x.id, x);
                })
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadAmount = async () => {
        try {
            const result = await agent.Cars.amount();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    createCar = async (car: CarFormValues) => {
        try {
            car.id = uuid();
            await agent.Cars.create(car);
            runInAction(() => {
                if (this.carsRegister.size > 0) {
                    this.carsRegister.set(car.id!, car as Car);
                }
            })
            return car.id;
        } catch (error) {
            console.log(error);
        }
    }

    updateCar = async (car: CarFormValues) => {
        try {
            await agent.Cars.update(car);
            runInAction(() => {
                if (this.carsRegister.size > 0) {
                    this.carsRegister.set(car.id!, car as Car);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteCar = async (id: string) => {
        try {
            await agent.Cars.delete(id);
            runInAction(() => {
                this.carsRegister.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}