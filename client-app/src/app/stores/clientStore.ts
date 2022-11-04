import { store } from "./store";
import { makeAutoObservable, runInAction } from 'mobx';
import { Client, ClientFormValues } from '../models/client';
import agent from '../api/agent'
import { addAbortSignal } from "stream";

export default class ClientStore {

    clientsRegister = new Map<string, Client>();
    formClientState = false;
    editingClient = new ClientFormValues();

    constructor() {
        makeAutoObservable(this);
    }

    get clients() {
        return Array.from(this.clientsRegister.values()).sort((a, b) => {
            let aName = a.lastName.toUpperCase();
            let bName = b.lastName.toUpperCase();
            if (aName > bName) { return 1 }
            if (aName < bName) { return -1 }
            return 0;
        });
    }

    setEditingClient = (id: string) => {
        this.editingClient = this.clientsRegister.get(id)!;
        this.setFormClient(true);
    }

    setFormClient = (state: boolean) => {
        if (!state) {
            this.editingClient = new ClientFormValues();
        }
        this.formClientState = state;
    }

    loadClients = async () => {
        try {
            const result = await agent.Clients.list();
            runInAction(() => {
                result.map(x => {
                    this.clientsRegister.set(x.id, x);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    createClient = async (client: ClientFormValues) => {
        try {
            await agent.Clients.create(client);
            runInAction(() => {
                this.clientsRegister.set(client.id!, client as Client);
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateClient = async (client: ClientFormValues) => {
        try {
            await agent.Clients.update(client);
            runInAction(() => {
                this.clientsRegister.set(client.id!, client as Client);
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteClient = async (id: string) => {
        try {
            await agent.Clients.delete(id);
            runInAction(() => {
                this.clientsRegister.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}