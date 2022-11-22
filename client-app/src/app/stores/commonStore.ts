import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ClientBasic } from "../models/client";
import { dropDownOption } from "../models/dropDownOption";

export default class CommonStore {

    clientsNames: ClientBasic[] = [];
    token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);

        reaction( 
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    loadClientsName = async () => {
        try {
            //if (this.clientsNames.length === 0) {
                const result = await agent.Clients.listBasic();
                runInAction(() => {
                    this.clientsNames = result;
                })
            //}
        } catch (error) {
            console.log(error);
        }
    }

    get clientsNamesOptions() {
        let names: dropDownOption<string>[] = [];
        this.clientsNames.forEach((cn => {
            names.push({ text: cn.name, value: cn.id })
        }))
        return names;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

}