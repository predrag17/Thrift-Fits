import React, {useState} from 'react'
import MainImage from '../../../../assets/mainImage.png'
import "bootstrap/dist/css/bootstrap.min.css"
import '../main.css'
import '../../../../index.css'
import {Link, useNavigate} from "react-router-dom";
import Service from "../../../../repository/Service";

function MainLogin() {

    const history = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Service.loginUser(formData)
            .then(response => {
                localStorage.setItem("JWT", response.data.token)

                history("/home", {state: {fromLogin: true} });
            })
            .catch(() => {
                setError("Invalid username or password")

                setTimeout(() => {
                    setError('');
                }, 10000);
            })
    }

    return (
        <>
            <div className="container-fluid position-relative"
                 style={{paddingTop: "100px", paddingLeft: "0", paddingRight: "0"}}>
                <img
                    src={MainImage}
                    alt="Image"
                    style={{
                        width: "100%",
                        height: "1000px",
                        objectFit: "cover"
                    }}
                />

                <div className="popup-container popup-small">
                    <div className="popup-content">
                        <h1 className="text-center pt-4" style={{fontWeight: "bold", fontSize: "50px"}}>Login</h1>

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
                                        {error && <p style={{color: 'red', fontSize: "20px", fontWeight: "bold"}}>
                                            {error}
                                        </p>}
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" id="exampleInputEmail1"
                                               aria-describedby="emailHelp" placeholder="Enter username"
                                               required
                                               name="username"
                                               value={formData.username}
                                               onChange={handleChange}
                                               style={{
                                                   marginBottom: "40px",
                                                   padding: "15px",
                                                   width: "100%",
                                               }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword1"
                                               required
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
                                    >Login
                                    </button>

                                </form>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4 style={{
                                fontWeight: "bold",
                                fontSize: "35px"
                            }}>You don't have one?</h4>

                            <Link to={"/register"} style={{textDecoration: "none", width: "100%", boxShadow: "none"}}>
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
                                >Create an Account!
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default MainLogin