import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer/index';

export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}


const ToastContext = createContext<ToastContextData>({} as ToastContextData);


const ToastProvider: React.FC = ({ children }) => {

    const [messages, setMessages] = useState<ToastMessage[]>([]);
    const [] = useState();

    //message:Omit<ToastMessage,'id'> > type = todos os de ToastMessage menos id
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();
        const toast = {
            id,
            type,
            title,
            description
        };
        // setMessages([...messages, toast]);//quer apenas incluir > nao quer perder os toasts que já tem
        setMessages(state => [...state, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages(state => state.filter(message => { return message.id !== id }))
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} ></ToastContainer>
        </ToastContext.Provider>
    );
}


function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    };

    return context;
}




export { ToastProvider, useToast, };