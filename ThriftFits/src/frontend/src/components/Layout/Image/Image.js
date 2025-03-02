import React from 'react'
import HomeImage from "../../../assets/home.png";
import '../../../index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import './image.css'

function Image() {
    return (
        <div className="container-fluid" id="main-container" style={{padding: "0", marginTop: "105px"}}>
            <div className="row">
                <div className="col">
                    <img
                        src={HomeImage}
                        alt="Banner"
                        className="img-fluid"
                        style={{height: "650px", width: "100%", objectFit: "cover"}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Image;