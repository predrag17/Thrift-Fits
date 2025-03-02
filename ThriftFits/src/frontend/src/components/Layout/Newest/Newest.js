import React, {useEffect, useState} from 'react'
import '../../../index.css'
import AdCard from "../AdCard/AdCard";
import Service from "../../../repository/Service";
import {Link} from "react-router-dom";
import './newest.css'

function Newest() {

    const [ads, setAds] = useState([]);
    const [JWT, setJWT] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("JWT");

        if (token) {
            setJWT(token);
        }

        Service.fetchNewestAds()
            .then(response => {
                setAds(response.data)
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <>
            {ads.length !== 0 ? (
                <div className="container-fluid d-flex flex-column align-items-center justify-content-center"
                     style={{marginTop: "50px", marginBottom: "50px", paddingLeft: "0", paddingRight: "0"}}>
                    <div style={{marginBottom: "30px"}}>
                        <h1 style={{fontWeight: "bold"}}>Newest Ads that maybe you are interested in!</h1>
                    </div>


                    <div className="container-fluid">
                        <div className="row d-flex justify-content-start">
                            {ads.map(ad => (
                                <div className="col-md-3 mb-4 d-flex justify-content-center" key={ad.id}>
                                    <AdCard ad={ad}/>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                <div className="container-fluid" style={{marginTop: "200px", marginBottom: "100px"}}>
                    <div className="container mt-5">
                        <div className="alert alert-success" role="alert">
                            <div className="d-flex flex-column justify-content-between align-items-center">
                                <p style={{textAlign: "center", fontWeight: "bold", fontSize: "40px"}}>
                                    Still no ads have been added!
                                </p>
                                {JWT && (
                                    <div className="container d-flex justify-content-center">
                                        <Link to={"/add"}>
                                            <button className="btn btn-success btn-lg">
                                                Add
                                            </button>
                                        </Link>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Newest;