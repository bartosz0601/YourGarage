import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ClientBasic } from "../models/client";
import { dropDownOption } from "../models/dropDownOption";

export default class CommonStore {

    clientsNames: ClientBasic[] = [];
    clientsNamesOptions: dropDownOption<string>[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadClientsName = async () => {
        try {
            if (this.clientsNames.length === 0) {
                const result = await agent.Clients.listBasic();
                runInAction(() => {
                    this.clientsNames = result;
                    //update clients names list
                    this.writeClientsNameOptions(result);
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    writeClientsNameOptions = (clients: ClientBasic[]) => { 
        clients.forEach((cn => {
            this.clientsNamesOptions.push({ text: cn.name, value: cn.id })
        }))
    }
}