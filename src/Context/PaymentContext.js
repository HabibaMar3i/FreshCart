import { createContext } from "react";

export const PaymentContext = createContext()

export function PaymentContextProvider({ children }) {
    const headers = {
        token: localStorage.getItem('userToken')
    };
    
    return (
        <PaymentContext.Provider value={headers}></PaymentContext.Provider>
    );
}