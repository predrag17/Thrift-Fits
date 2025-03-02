import React, {useEffect, useState} from 'react'
import NavBar from "../Layout/NavBar/NavBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import Service from "../../repository/Service";
import CardImage from '../../assets/clothes.jpg'
import Footer from "../Layout/Footer/Footer";
import {jwtDecode} from "jwt-decode";
import './Main/main.css'

function Details() {
    const {id} = useParams();
    const [ad, setAd] = useState(null);
    const [username, setUsername] = useState(null);
    const history = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const JWT = localStorage.getItem("JWT");

        if (JWT) {
            setUsername(jwtDecode(JWT).sub);
        }

        Service.getAdById(id)
            .then(response => {
                Service.fetchImageById(response.data.image.id)
                    .then(response => {
                        setImageUrl(`data:image/png;base64,${response.data}`);
                    })
                    .catch(error => {
                        console.log(error);
                        setImageUrl(null);
                    });
                setAd(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    if (!ad) {
        return (
            <>
                <NavBar/>
                <div className="container" style={{marginTop: "150px"}}>
                </div>
            </>
        );
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setShowDeleteConfirmation(true);
    }

    const confirmDelete = () => {
        Service.deleteAdById(ad.id)
            .then(() => {
                setImageUrl(null);
                setShowDeleteConfirmation(false);
                history("/myAds");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <NavBar/>
            <div className="container" style={{marginTop: "150px", marginBottom: "100px"}}>
                <div
                    className="container d-flex flex-column justify-content-center align-items-center ">
                    <div style={{marginBottom: "30px"}}>
                        <h1 style={{fontWeight: "bold"}}>DETAILS FOR THE AD THAT POSTED {ad.user.username}</h1>
                    </div>

                    <div className="container d-flex justify-content-between align-items-center styled-container">
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{width: "100%", margin: "0"}}>
                            <div>
                                <img
                                    src={imageUrl}
                                    alt="Image"
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        marginTop: '10px',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>

                            <div className="d-flex justify-content-center" style={{marginTop: "10px", width: "100%"}}>
                                <div>
                                    {ad.user.phone && (
                                        <p style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            marginRight: "10px"
                                        }}>{ad.user.phone}</p>
                                    )}
                                </div>

                                <div style={{marginRight: "15px"}}>
                                    <p style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        marginRight: "10px"
                                    }}>{ad.user.email}</p>
                                </div>

                                <div>
                                    {ad.user.instagramUsername && (
                                        <Link to={`https://www.instagram.com/${ad.user.instagramUsername}/`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="container d-flex flex-column align-items-start" style={{marginLeft: "10px"}}>
                            <div className="d-flex flex-column justify-content-center">
                                <h3 style={{fontWeight: "bold"}}>{ad.clothingName}</h3>
                                {ad.clothingSize && (<p style={{fontSize: "20px"}}>Size {ad.clothingSize}</p>)}
                            </div>

                            <div className="d-flex flex-column" style={{marginBottom: "20px"}}>
                                <p style={{fontSize: "20px", margin: "0"}}>{ad.clothingType} by {ad.clothingBrand}</p>
                                <p style={{fontSize: "20px", margin: "0"}}>Color: {ad.clothingColor}</p>
                                <h3 style={{fontWeight: "bold"}}>More Details:</h3>
                            </div>

                            <div style={{
                                width: "100%",
                                marginLeft: "30px",
                                maxHeight: "200px",
                                overflowY: "auto",
                                fontSize: "20px",
                                fontWeight: "bold"
                            }}>
                                <p style={{whiteSpace: 'pre-line'}}>{ad.description}</p>
                            </div>

                            <div style={{marginTop: "20px", width: "100%"}}>
                                {username === ad.user.username ? (
                                    <div className="d-flex flex-column align-items-start justify-content-center">
                                        <Link to={`/ads/${ad.id}/edit`} style={{width: "80%", marginBottom: "10px"}}>
                                            <button className="btn btn-warning btn-lg" style={{width: "100%"}}>Edit
                                            </button>
                                        </Link>

                                        <button className="btn btn-danger btn-lg" style={{width: "80%"}}
                                                onClick={handleDelete}>Delete
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-danger btn-lg" style={{width: "80%"}}>
                                            Favourite
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div style={{marginTop: "20px"}}>
                                <p style={{fontSize: "20px"}}>To view all ads posted by this user, click <Link
                                    to={`/user/${ad.user.username}`}>here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {showDeleteConfirmation && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this ad?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    )
}

export default Details;