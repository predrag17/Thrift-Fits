import React from 'react'
import NavBar from "../Layout/NavBar/NavBar";
import Footer from "../Layout/Footer/Footer";
import MainLogin from "../Layout/MainPart/Login/MainLogin";

function Login() {
    return (
        <>
            <NavBar parentComponent="Login"/>
            <MainLogin/>
            <Footer/>
        </>
    )
}

export default Login