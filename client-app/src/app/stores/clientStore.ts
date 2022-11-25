import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { Client, ClientFormValues } from '../models/client';
import agent from '../api/agent'
import { v4 as uuid } from 'uuid';
import { Pagination, PagingParams } from "../models/pagination";
import UserStore from './userStore';
import { store } from './store';

export default class ClientStore {

    loadingInitial = false;
    loadingClient = false;
    clientsRegister = new Map<string, Client>();
    editingClient = new ClientFormValues();
    client: Client | null = null;
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    searchParam: string = "";

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => { return this.searchParam },
            () => {
                this.pagingParams = new PagingParams();
                this.clientsRegister.clear();
                this.loadClients();
            }
        )
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

    initClients = () => {
        this.pagingParams = new PagingParams();
        this.clientsRegister.clear();
        this.searchParam = "";
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

    setLoadingClient(state: boolean) { 
        this.loadingClient = state;
    }

    setEditingClient = (id: string) => {
        this.editingClient = this.clientsRegister.get(id)!;
    }

    initFormClient = () => {
        this.editingClient = new ClientFormValues();
    }

    loadClients = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Clients.list(this.axiosParams);
            runInAction(() => {
                result.data.forEach(x => {
                    this.clientsRegister.set(x.id, x);
                })
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadClient = async (id: string) => {
        this.loadingClient = true;
        try {
            const result = await agent.Clients.get(id);
            runInAction(() => {
                this.client = result;
            })
            this.setLoadingClient(false);
        } catch (error) {
            console.log(error);
            this.setLoadingClient(false);
        }
    }

    loadAmount = async () => {
        try {
            const result = await agent.Clients.amount();
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    createClient = async (client: ClientFormValues) => {
        try {
            client.id = uuid();
            await agent.Clients.create(client);
            runInAction(() => {
                this.clientsRegister.set(client.id!, client as Client);
            })
            return client.id;
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