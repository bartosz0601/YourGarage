import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { Service, ServiceFormValues } from '../../app/models/service';
import agent from '../../app/api/agent'
import { v4 as uuid } from 'uuid';
import { Pagination, PagingParams } from "../models/pagination";

export default class ServiceStore {

    loadingInitial = false;
    servicesRegister = new Map<String, Service>();
    pagingParams = new PagingParams();
    pagination: Pagination | null = null;
    startDate: Date | undefined = this.GetPastDate(30);
    endDate: Date | undefined = new Date();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => {
                return [this.startDate, this.endDate]
            },
            () => {
                if (this.startDate && this.endDate && 
                    window.location.href.includes('services')) {                 
                    this.pagingParams = new PagingParams();
                    this.servicesRegister.clear();
                    this.loadServices();
                    console.log('reaction');
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

    initServices = () => {
        this.pagingParams = new PagingParams();
        this.servicesRegister.clear();
        this.setDates(this.GetPastDate(30), new Date());
    }

    get services() {
        return Array.from(this.servicesRegister.values()).sort((a, b) => {
            if (a.date! < b.date!) { return 1 }
            if (a.date! > b.date!) { return -1 }
            return 0;
        });
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('startDate', this.startDate!.toISOString());
        params.append('endDate', this.endDate!.toISOString());
        return params;
    }

    get axiosDatesParams() {
        const params = new URLSearchParams();
        params.append('dateTimes', this.GetPastDate(365).toISOString());
        params.append('dateTimes', this.GetPastDate(30).toISOString());
        params.append('dateTimes', this.GetPastDate(7).toISOString());
        return params;
    }

    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }

    loadServices = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Services.list(this.axiosParams);
            runInAction(() => {
                result.data.forEach(s => {
                    s.date = new Date(s.date!);
                    this.servicesRegister.set(s.id, s);
                });
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
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
        this.loadingInitial = true;
        try {
            let result = await agent.Services.get(id).then();
            runInAction(() => {
                result.date = new Date(result.date!);
            })
            this.setLoadingInitial(false);
            return result;
        } catch (error) {blank
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadStatistics = async () => {
        try {
            const result = await agent.Services.statistics(this.axiosDatesParams);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    createService = async (service: ServiceFormValues, clientName: string, carName: string) => {
        try {
            service.id = uuid();
            await agent.Services.create(service);
            runInAction(() => {
                this.servicesRegister.set(service.id!, { ...service as Service, clientName: clientName, carName: carName });
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateService = async (service: ServiceFormValues, clientName: string, carName: string) => {
        try {
            await agent.Services.update(service);
            runInAction(() => {
                this.servicesRegister.set(service.id!, { ...service as Service, clientName: clientName, carName: carName});
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteService = async (id: string) => {
        try {
            await agent.Services.delete(id);
            runInAction(() => {
                this.servicesRegister.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}