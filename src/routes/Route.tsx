// import React from 'react';
// import { Route as ReactRouteDOM, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';

// import { useAuth } from '../context/auth';

// interface RouteProps extends ReactDOMRouteProps {
//     isPrivate?: boolean;
//     component: React.ComponentType;
// }



// // isPrivate=false >>>valor default é false
// const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
//     const { user } = useAuth();

//     console.log(user, isPrivate)

//     return (
//         <ReactRouteDOM
//             {...rest}
//             render={() => {
//                 return isPrivate === isSigned ? (
//                     <Component />
//                 ) : (
//                         <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />)
//             }}
//         />

//     );

// };

// export default Route;









import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                        <Redirect
                            to={{
                                pathname: isPrivate ? '/' : '/dashboard',
                                state: { from: location },
                            }}
                        />
                    );
            }}
        />
    );
};

export default Route;

