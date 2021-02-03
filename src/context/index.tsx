import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

//IMPORTANTE: Se  Toast dependesse de autentificação > colocaria ele DENTRO do de autentificação (o que depende fica dentro)
const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    )
};


export { AppProvider };