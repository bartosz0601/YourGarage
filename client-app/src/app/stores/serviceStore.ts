import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { Service, ServiceFormValues } from '../../app/models/service';
import agent from '../../app/api/agent'
import { v4 as uuid } from 'uuid';
import { Pagination, PagingParams } from "../models/pagination";

export default class ServiceStore {

    services: Service[] = [];
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    startDate: Date = this.GetPastDate(30);
    endDate: Date = new Date();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => {
                return [this.startDate, this.endDate]
            },
            () => {
                if (this.startDate && this.endDate) {
                    this.pagingParams = new PagingParams();
                    this.services = [];
                    this.loadServices();
                }
            }
        )
    }

    private GetPastDate(days: number) {
        let date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setDates = (startDate: Date, endDate: Date) => {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('startDate', this.startDate.toISOString());
        params.append('endDate', this.endDate.toISOString());
        return params;
    }

    loadServices = async () => {
        try {
            const result = await agent.Services.list(this.axiosParams);
            runInAction(() => {
                result.data.forEach(s => { s.date = new Date(s.date!) });
                this.services.push(...result.data);
            })
            this.setPagination(result.pagination);
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