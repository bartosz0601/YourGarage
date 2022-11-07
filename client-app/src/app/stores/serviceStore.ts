import { makeAutoObservable, runInAction } from 'mobx';
import { Service, ServiceFormValues } from '../../app/models/service';
import agent from '../../app/api/agent'
import { Client } from "../models/client";
import { dropDownOption } from "../models/dropDownOption";
import { v4 as uuid } from 'uuid';

export default class ServiceStore {

    services: Service[] = [];
    serviceFormClient: Client | undefined;
    carsNamesOptions: dropDownOption<string>[] = [];
    editingService = new ServiceFormValues();
    formServiceState = false;

    constructor() {
        makeAutoObservable(this);
    }

    setEditingService = async (id: string) => {
        this.editingService = this.services.filter(s => s.id === id)[0] as ServiceFormValues;
        await this.loadClient(this.editingService.clientId);
        this.setFormService(true);
    }

    setFormService = (state: boolean) => {
        if (!state) {
            this.editingService = new ServiceFormValues();
            this.serviceFormClient = undefined;
        }
        this.formServiceState = state;
    }

    loadServices = async () => {
        try {
            const result = await agent.Services.list();
            runInAction(() => {
                this.setFormService(false);
                result.forEach(s => { s.date = new Date(s.date!) });
                this.services = result;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadClient = async (id: string) => {
        this.carsNamesOptions = [];
        if (!id) {
            this.serviceFormClient = undefined;
        } else {
            try {
                let result = await agent.Clients.get(id);
                runInAction(() => {
                    this.serviceFormClient = result;
                    result.cars?.forEach((c => {
                        this.carsNamesOptions.push({ text: c.brand + ' ' + c.model + ' ' + c.year, value: c.id });
                    }))
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    createService = async (service: ServiceFormValues) => {
        try {
            service.id = uuid();
            await agent.Services.create(service);
            runInAction(() => {
                this.services.push({
                    clientName: this.serviceFormClient?.firstName + ' ' + this.serviceFormClient?.lastName,
                    carName: this.carsNamesOptions.filter(cn => cn.value === service.carId)[0].text,
                    ...service
                } as Service);
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateService = async (service: ServiceFormValues) => {
        try {
            await agent.Services.update(service);
            runInAction(() => {
                let index = this.services.findIndex(s => s.id === service.id)
                this.services[index] = {
                    clientName: this.serviceFormClient?.firstName + ' ' + this.serviceFormClient?.lastName,
                    carName: this.carsNamesOptions.filter(cn => cn.value === service.carId)[0].text,
                    ...service
                } as Service;
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteService = async (id: string) => {
        try {
            await agent.Services.delete(id);
            runInAction(() => {
                this.services = this.services.filter(s => !(s.id === id))
            })
        } catch (error) {
            console.log(error);
        }
    }
}