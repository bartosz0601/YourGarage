import { createContext, useContext } from "react";
import CarStore from "./carStore";
import ClientStore from "./clientStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ServiceStore from "./serviceStore";
import UserStore from "./userStore";

interface Store {
    serviceStore: ServiceStore,
    clientStore: ClientStore,
    carStore: CarStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    userStore: UserStore
}

export const store: Store = {
    serviceStore: new ServiceStore(),
    clientStore: new ClientStore(),
    carStore: new CarStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}