import { store } from "./store";
import { makeAutoObservable, runInAction } from 'mobx';
import { Client } from '../models/client';
import agent from '../api/agent'

export default class ClientStore {

    clients: Client[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadClients = async () => {
        try {
            const result = await agent.Clients.list();
            runInAction(() => {
                this.clients = result;
            })
        } catch (error) {
            console.log(error);
        }
    }
}