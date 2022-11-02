import { store } from "./store";
import { makeAutoObservable, runInAction } from 'mobx';
import { Service } from '../../app/models/service';
import agent from '../../app/api/agent'

export default class ServiceStore { 
    
    services: Service[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadServices = async () => { 
        try {
            const result = await agent.Services.list();
            runInAction(() => {
                this.services = result;
            })
        } catch (error) { 
            console.log(error);
        }
    }
}