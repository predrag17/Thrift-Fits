import React, {useState} from 'react'
import MainImage from "../../../../assets/mainImage.png";
import '../main.css'
import {Link, useNavigate} from "react-router-dom";
import Service from "../../../../repository/Service";

function MainRegister() {

    const history = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        instagramUsername: '',
        phone: '',
        email: '',
        username: '',
        password: ''
    })
    const [showNotification, setShowNotification] = useState({
        instagram: false,
        phone: false
    });
    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleFocus = (field) => {
        setShowNotification({
            ...showNotification,
            [field]: true
        });
    };

    const handleBlur = (field) => {
        setShowNotification({
            ...showNotification,
            [field]: false
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Service.registerUser(formData)
            .then(() => {
                console.log("User successfully registered")
                setShowSuccessPopup(true);

                setTimeout(() => {
                    setShowSuccessPopup(false);
                    history("/login");
                }, 3000)
            })
            .catch(error => {
                console.error("Error: ", error);
                setError("User with that username or email already exists!");

                setTimeout(() => {
                    setError('');
                }, 10000);
            })
    }

    return (
        <div className="container-fluid position-relative"
             style={{paddingTop: "100px", paddingLeft: "0", paddingRight: "0"}}>
            <img
                src={MainImage}
                alt="Image"
                style={{
                    width: "100%",
                    height: "1200px",
                    objectFit: "cover"
                }}
            />

            <div className="popup-container popup-large">
                <div className="popup-content">
                    <h1 className="text-center pt-4" style={{fontWeight: "bold", fontSize: "50px"}}>Register</h1>

                    <div className="container-fluid d-flex justify-content-center align-items-center">
                        <div style={{width: "70%"}}>
                            <form
                                onSubmit={handleSubmit}
                                style={{
                                    marginTop: "60px",
                                    marginBottom: "100px"
                                }}
                            >

                                <div style={{textAlign: 'center'}}>
                                    {error && <p style={{color: 'red', fontSize: "18px", fontWeight: "bold"}}>
                                        {error}
                                    </p>}
                                </div>

                                <div className="form-group">
                                    <input type="text"
                                           className="form-control" id="exampleInputFullname"
                                           name="fullName"
                                           placeholder="Fullname"
                                           value={formData.fullName}
                                           onChange={handleChange}
                                           required
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%",

                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    {showNotification.instagram && (
                                        <small style={{color: "gray", fontSize: "17px"}}>This field is not
                                            required</small>
                                    )}
                                    <input type="text"
                                           className="form-control" id="exampleInputInstagram"
                                           name="instagramUsername"
                                           placeholder="Instagram Username"
                                           value={formData.instagramUsername}
                                           onFocus={() => handleFocus("instagram")}
                                           onBlur={() => handleBlur("instagram")}
                                           onChange={handleChange}
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%"
                                           }}
                                    />
                                </div>

                                <div className="form-group">
                                    {showNotification.phone && (
                                        <small style={{color: "gray", fontSize: "17px"}}>This field is not
                                            required</small>
                                    )}
                                    <input type="text" className="form-control" id="exampleInputPhone"
                                           placeholder="Phone number"
                                           name="phone"
                                           value={formData.phone}
                                           onChange={handleChange}
                                           onFocus={() => handleFocus("phone")}
                                           onBlur={() => handleBlur("phone")}
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%"
                                           }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail"
                                           placeholder="Email"
                                           name="email"
                                           value={formData.email}
                                           onChange={handleChange}
                                           required
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%"
                                           }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control" id="exampleInputPassword"
                                           placeholder="Username"
                                           name="username"
                                           value={formData.username}
                                           onChange={handleChange}
                                           required
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%"
                                           }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           placeholder="Password"
                                           name="password"
                                           value={formData.password}
                                           onChange={handleChange}
                                           style={{
                                               marginBottom: "40px",
                                               padding: "15px",
                                               width: "100%"
                                           }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary d-block mx-auto"
                                        style={{
                                            backgroundColor: "#4064FF",
                                            width: "65%",
                                            padding: "10px",
                                            fontSize: "17px",
                                            transition: "transform 0.3s, color 0.3s, font-weight 0.3s, box-shadow 0.3s",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0)"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target["style"].transform = "scale(1.05)";
                                            e.target["style"].color = "black";
                                            e.target["style"].fontWeight = "bold";
                                            e.target["style"].boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.6)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target["style"].transform = "scale(1)";
                                            e.target["style"].color = "";
                                            e.target["style"].fontWeight = "";
                                            e.target["style"].boxShadow = "0px 4px 6px rgba(0, 0, 0, 0)";
                                        }}
                                >Register
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h4 style={{
                            fontWeight: "bold",
                            fontSize: "35px"
                        }}>You already have one?</h4>

                        <Link to={"/login"} style={{textDecoration: "none", width: "100%", boxShadow: "none"}}>
                            <button type="submit" className="btn btn-primary d-block mx-auto"
                                    style={{
                                        backgroundColor: "#FF4040",
                                        width: "65%",
                                        padding: "10px",
                                        fontSize: "20px",
                                        transition: "transform 0.5s, color 0.3s, font-weight 0.3s, box-shadow 0.3s",
                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0)"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target["style"].transform = "scale(1.05)";
                                        e.target["style"].color = "black";
                                        e.target["style"].fontWeight = "bold";
                                        e.target["style"].boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.6)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target["style"].transform = "scale(1)";
                                        e.target["style"].color = "";
                                        e.target["style"].fontWeight = "";
                                        e.target["style"].boxShadow = "0px 4px 6px rgba(0, 0, 0, 0)";
                                    }}
                            >Login!
                            </button>
                        </Link>
                    </div>

                </div>
            </div>

            {showSuccessPopup && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success!</h5>
                            </div>
                            <div className="modal-body">
                                <p>You have successfully registered. Redirecting to login...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainRegister;