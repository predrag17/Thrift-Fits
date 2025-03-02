import React from 'react'
import {Link} from "react-router-dom";


function Info() {

    return (
        <div className="container mt-5">
            <div className="alert alert-success" role="alert">
                <div className="d-flex flex-column justify-content-between align-items-center">
                    <p style={{textAlign: "center", fontWeight: "bold", fontSize: "40px"}}>
                        Unfortunately, we have not yet implemented saving of favorite ads, it will be implemented soon
                    </p>

                    <Link to={"/ads"}>
                        <button className="btn btn-success btn-lg">Ads</button>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default Info