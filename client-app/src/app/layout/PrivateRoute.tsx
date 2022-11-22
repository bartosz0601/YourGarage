import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Navigate} from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function PrivateRoute({ children }: any) {
    const { userStore: { isLoggedIn } } = useStore();

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }
    return children;
})