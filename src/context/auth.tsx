// import React, { createContext, useCallback, useState, useContext } from 'react';

// import api from '../services/api';


// interface AuthState {
//     token: string;
//     user: object;
// }

// interface SignInCredentials {
//     email: string;
//     password: string;
// }

// interface AuthContextData {
//     name: string;
//     signIn(credentials: SignInCredentials): Promise<void>;
//     signOut(): void;
// }

// // createContext<Tipo de Variável>(defaultValue)
// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// //children = TODAS as propriedades
// // Tudo o que esse componente receber como filho é repassado para dentro de AuthContext.Provider
// const AuthProvider: React.FC = ({ children }) => {

//     const [data, setData] = useState<AuthState>(() => {
//         const token = localStorage.getItem('@GoBarber:token');
//         const user = localStorage.getItem('@GoBarber:user');

//         if (token && user) {
//             return { token, user: JSON.parse(user) } as AuthState;
//         }

//         return {} as AuthState;
//     });

//     console.log(data);

//     const signIn = useCallback(async ({ email, password }) => {
//         const response = await api.post('sessions', {
//             email: email,
//             password: password,
//         });
//         console.log(response)

//         const { token, user } = response.data;

//         localStorage.setItem('@GoBarber:token', token);//"3iu4h31u5h3u5h31h5i31h5"
//         localStorage.setItem('@GoBarber:user', JSON.stringify(user));//{id: "568cd99e-f26b-4674-afa7-4bfed58144bb", name: "Gabr


//         //Ajustando Estado
//         setData({
//             token: token,
//             user: user
//         });


//     }, []);

//     const signOut = useCallback(() => {
//         localStorage.removeItem('@GoBarber:token');
//         localStorage.removeItem('@GoBarber:user');

//         //Ajustando Estado
//         setData({} as AuthState);
//     }, [])

//     return (
//         <AuthContext.Provider value={{ name: 'Diego', signIn, signOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// function useAuth(): AuthContextData {
//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error("useAuth must be use within an AuthProvider");
//     }

//     return context;
// }


// export { AuthContext, AuthProvider, useAuth };









import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };