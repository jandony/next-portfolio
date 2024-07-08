"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
