import { User, UserFormValues } from "../models/user";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.user?.username,
            () => {
                if (this.user?.username) {
                    store.clientStore.initClients();
                    store.carStore.initCars();
                    store.serviceStore.initServices();
                }
            })
    }


    get isLoggedIn() {
        return !!this.user;
    }

    login = async (userFormValues: UserFormValues) => {
        try {
            const user = await agent.Account.login(userFormValues);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
    }

    register = async (userFormValues: UserFormValues) => {
        try {
            const user = await agent.Account.register(userFormValues);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}