import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeList from '../pages/code_list';
import Login from '../pages/login/login/Login'
import PrivateRoute from './PrivateRouter';



const AppRouter = () => {
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/' element={<CodeList />} />
                    </Route>
                    <Route exact path='/login' element={<Login />} />
                </Routes>
            </Fragment>
        </Router>

    );
}

export default AppRouter