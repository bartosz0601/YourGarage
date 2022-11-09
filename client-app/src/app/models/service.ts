export interface Service { 
    id: string;
    date: Date | null;
    mileage: Number;
    actions: string;
    price: Number;
    time: Number;
    carId: string;
    carName: string;
    clientId: string;
    clientName: string;
}

export class ServiceFormValues {
    id?: string = undefined;
    date: Date | null = null;
    mileage: Number = 0;
    actions: string = '';
    price: Number = 0;
    time: Number = 0;
    clientId: string = '';
    carId: string = '';
    
    constructor(service?: Service) {
        if (service) {
            this.id = service.id;
            this.date = service.date;
            this.mileage = service.mileage;
            this.actions = service.actions;
            this.price = service.price;
            this.time = service.time;
            this.clientId = service.clientId;
            this.carId = service.carId;
        }
    }
}