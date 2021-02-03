import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import Route from './Route';

//Switch: Permite apenas uma rota de cada vez

//exact para nao cair sempre em "/" pois o router-dom faz um include e nao um exact como default


//Se tiver o "isPrivate" e usuário nao tiver logado: redireciona para pag de LogIn
const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
)



export default Routes;