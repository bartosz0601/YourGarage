import { makeAutoObservable, runInAction } from 'mobx';
import { Service, ServiceFormValues } from '../../app/models/service';
import agent from '../../app/api/agent'
import { Client } from "../models/client";
import { dropDownOption } from "../models/dropDownOption";
import { v4 as uuid } from 'uuid';

export default class ServiceStore {

    services: Service[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadServices = async () => {
        try {
            const result = await agent.Services.list();
            runInAction(() => {
                result.forEach(s => { s.date = new Date(s.date!) });
                this.services = result;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadClient = async (id: string) => {
        try {
            let result = await agent.Clients.get(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    loadService = async (id: string) => {
        try {
            let result = await agent.Services.get(id).then();
            runInAction(() => {
                result.date = new Date(result.date!);
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    createService = async (service: ServiceFormValues) => {
        try {
            service.id = uuid();
            await agent.Services.create(service);
        } catch (error) {
            console.log(error);
        }
    }

    updateService = async (service: ServiceFormValues) => {
        try {
            await agent.Services.update(service);
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