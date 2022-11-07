import { createContext, useContext } from "react";
import CarStore from "./carStore";
import ClientStore from "./clientStore";
import CommonStore from "./commonStore";
import ServiceStore from "./serviceStore";

interface Store {
    serviceStore: ServiceStore,
    clientStore: ClientStore,
    carStore: CarStore,
    commonStore: CommonStore
}

export const store: Store = {
    serviceStore: new ServiceStore(),
    clientStore: new ClientStore(),
    carStore: new CarStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}