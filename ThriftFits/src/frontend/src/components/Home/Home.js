import React, {useEffect, useState} from "react";
import NavBar from "../Layout/NavBar/NavBar";
import '../../index.css'
import Image from "../Layout/Image/Image";
import Newest from "../Layout/Newest/Newest";
import Information from "../Layout/Information/Information";
import Footer from "../Layout/Footer/Footer";
import {useLocation} from "react-router-dom";

function Home() {
    const location = useLocation();
    const isFromLogin = location.state && location.state.fromLogin;

    const [showWelcomePopup, setShowWelcomePopup] = useState(isFromLogin);

    useEffect(() => {
        if (isFromLogin) {
            setTimeout(() => {
                setShowWelcomePopup(false);
            }, 3000);
        }
    }, [isFromLogin]);

    return (
        <>
            <NavBar/>
            <Image/>
            <Newest/>
            <Information/>
            <Footer/>

            {showWelcomePopup && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success!</h5>
                            </div>
                            <div className="modal-body">
                                <p>Welcome! You have successfully logged in.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home;