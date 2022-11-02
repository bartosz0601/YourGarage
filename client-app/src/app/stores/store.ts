import { createContext, useContext } from "react";
import CarStore from "./carStore";
import ClientStore from "./clientStore";
import ServiceStore from "./serviceStore";

interface Store {
    serviceStore: ServiceStore,
    clientStore: ClientStore,
    carStore: CarStore
}

export const store: Store = {
    serviceStore: new ServiceStore(),
    clientStore: new ClientStore(),
    carStore: new CarStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}