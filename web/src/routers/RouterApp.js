import {React} from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import CodeList from '../pages/code_list'
import Login from '../pages/login';

const RouterApp = () => {
    return (
        <Router>
            <Routes>
                <Route path='/signin' element={<Login/>}></Route>
                <Route path="/" element={<CodeList/>} exact/>
                <Route path="/database" element={<CodeList/>}/>
            </Routes>
        </Router>

    )
}

export default RouterApp