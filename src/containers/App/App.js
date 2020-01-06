import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Register/Register';
import ConfirmAccount from '../ConfirmAccount/ConfirmAccount';
import Login from '../Login/Login';
import Home from '../Home/Home';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Profile from '../Profile/Profile';
import Order from '../Order/Order';
import WithLoading from '../../hoc/withLoading';

import NotFound from '../NotFound/NotFound';

const App = () => {
    return (
        <WithLoading>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/confirm-account" component={ConfirmAccount} />
                <Route path="/login" component={Login} />
                <Route path="/order" component={Order} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </WithLoading>
    );
}

export default App;
