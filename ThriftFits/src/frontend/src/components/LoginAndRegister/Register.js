import React, {useEffect} from 'react'
import NavBar from "../Layout/NavBar/NavBar";
import Footer from "../Layout/Footer/Footer";
import MainRegister from "../Layout/MainPart/Register/MainRegister";

function Register() {

    useEffect(() => {
        const JWT = localStorage.getItem("JWT");

        if(JWT) {
            localStorage.removeItem("JWT");
        }
    }, []);

    return (
        <>
            <NavBar parentComponent="Register"/>
            <MainRegister/>
            <Footer/>
        </>
    )
}

export default Register;