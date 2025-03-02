import React, {useEffect, useState} from 'react'
import NavBar from "../Layout/NavBar/NavBar";
import Footer from "../Layout/Footer/Footer";
import {useNavigate, useParams} from "react-router-dom";
import Service from "../../repository/Service";
import './Main/main.css'
function EditAd() {
    const history = useNavigate();
    const {id} = useParams();
    const [ad, setAd] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [formData, setFormData] = useState({
        clothingName: '',
        clothingBrand: '',
        clothingType: '',
        clothingSize: '',
        clothingColor: '',
        description: '',
        image: null
    })

    useEffect(() => {
        Service.getAdById(id)
            .then(response => {
                setAd(response.data)
                setFormData({
                    clothingName: response.data.clothingName,
                    clothingBrand: response.data.clothingBrand,
                    clothingType: response.data.clothingType,
                    clothingSize: response.data.clothingSize,
                    clothingColor: response.data.clothingColor,
                    description: response.data.description,
                    image: null
                })
            })
            .catch(error => {
                console.error(error);
            })


    }, [id]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader()

        reader.onload = (e) => {
            setImageSrc(e.target.result);
        }

        if (file) {
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                image: file
            });
        } else
            setImageSrc(null);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        Service.editAd(formDataToSend, ad.id)
            .then(() => {
                history(`/ads/${ad.id}/details`)
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    }


    return (
        <>
            <NavBar/>

            <div className="container" style={{marginTop: "200px"}}>
                <div className="header" style={{marginBottom: "50px"}}>
                    <h2>Step closer to Edit an Ad</h2>
                </div>

                <div className="container" style={{marginBottom: "50px"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-center styled-container">
                            <div className="container-fluid">
                                <div className="form-group d-flex flex-column align-items-center justify-content-around"
                                     style={{height: "500px"}}>
                                    <input
                                        type="file"
                                        id="uploadInput"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleFileSelect}/>
                                    {imageSrc ? (
                                        <label htmlFor="uploadInput">
                                            <img
                                                src={imageSrc}
                                                alt="Uploaded Image"
                                                style={{
                                                    width: '200px',
                                                    height: '350px',
                                                    marginTop: '10px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <label htmlFor="uploadInput">
                                            <div
                                                style={{
                                                    width: '200px',
                                                    height: '350px',
                                                    marginTop: '10px',
                                                    backgroundColor: '#ccc',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <span style={{
                                                    fontSize: '3rem',
                                                    fontWeight: "bold",
                                                    color: '#666'
                                                }}>+</span>
                                            </div>
                                        </label>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        style={{
                                            width: "50%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0)"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.1)";
                                            e.currentTarget.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.7)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0)";
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <div className="container d-flex justify-content-around align-items-center"
                                     style={{marginBottom: "30px"}}
                                >
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="clothingName"
                                            name="clothingName"
                                            value={formData.clothingName}
                                            onChange={handleChange}
                                            placeholder="Clothing Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="clothingBrand"
                                            name="clothingBrand"
                                            value={formData.clothingBrand}
                                            onChange={handleChange}
                                            placeholder="Clothing Brand"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="container d-flex flex-column justify-content-center"
                                     style={{marginBottom: "30px"}}>
                                    <div className="form-group" style={{marginBottom: "10px"}}>
                                        <select
                                            className="form-control"
                                            id="clothingType"
                                            name="clothingType"
                                            onChange={handleChange}
                                            value={formData.clothingType}
                                            required
                                        >
                                            <option value="">Clothing Type</option>
                                            <option>T-Shirt</option>
                                            <option>Shirt</option>
                                            <option>Polo Shirt</option>
                                            <option>Tank Top</option>
                                            <option>Hoodie</option>
                                            <option>Sweater</option>
                                            <option>Cardigan</option>
                                            <option>Blouse</option>
                                            <option>Dress</option>
                                            <option>Skirt</option>
                                            <option>Jeans</option>
                                            <option>Pants</option>
                                            <option>Shorts</option>
                                            <option>Leggings</option>
                                            <option>Jumpsuit</option>
                                            <option>Romper</option>
                                            <option>Suit</option>
                                            <option>Blazer</option>
                                            <option>Jacket</option>
                                            <option>Coat</option>
                                            <option>Raincoat</option>
                                            <option>Windbreaker</option>
                                            <option>Parka</option>
                                            <option>Vest</option>
                                            <option>Scarf</option>
                                            <option>Tie</option>
                                            <option>Bow Tie</option>
                                            <option>Belt</option>
                                            <option>Socks</option>
                                            <option>Underwear</option>
                                            <option>Bra</option>
                                            <option>Panties</option>
                                            <option>Boxers</option>
                                            <option>Briefs</option>
                                            <option>Bikini</option>
                                            <option>Swim Trunks</option>
                                            <option>Hat</option>
                                            <option>Cap</option>
                                            <option>Beanie</option>
                                            <option>Visor</option>
                                            <option>Headband</option>
                                            <option>Gloves</option>
                                            <option>Boots</option>
                                            <option>Sneakers</option>
                                            <option>Sandals</option>
                                            <option>Flip-flops</option>
                                            <option>High Heels</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="clothingSize"
                                                value={formData.clothingSize}
                                                onChange={handleChange}
                                                placeholder="Size"
                                                required
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="container-fluid d-flex flex-column">
                                    <div className="form-group" style={{marginBottom: "10px"}}>
                                        <select
                                            className="form-control"
                                            id="clothingColor"
                                            name="clothingColor"
                                            value={formData.clothingColor}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Clothing Color</option>
                                            <option style={{color: "white", backgroundColor: "white"}}>White</option>
                                            <option style={{color: "black", backgroundColor: "black"}}>Black</option>
                                            <option style={{color: "gray", backgroundColor: "gray"}}>Gray</option>
                                            <option style={{color: "red", backgroundColor: "red"}}>Red</option>
                                            <option style={{color: "blue", backgroundColor: "blue"}}>Blue</option>
                                            <option style={{color: "green", backgroundColor: "green"}}>Green</option>
                                            <option style={{color: "yellow", backgroundColor: "yellow"}}>Yellow</option>
                                            <option style={{color: "orange", backgroundColor: "orange"}}>Orange</option>
                                            <option style={{color: "purple", backgroundColor: "purple"}}>Purple</option>
                                            <option style={{color: "pink", backgroundColor: "pink"}}>Pink</option>
                                            <option style={{color: "brown", backgroundColor: "brown"}}>Brown</option>
                                            <option style={{color: "beige", backgroundColor: "beige"}}>Beige</option>
                                            <option style={{color: "navy", backgroundColor: "navy"}}>Navy</option>
                                            <option style={{color: "turquoise", backgroundColor: "turquoise"}}>Turquoise
                                            </option>
                                            <option style={{color: "maroon", backgroundColor: "maroon"}}>Maroon</option>
                                            <option style={{color: "olive", backgroundColor: "olive"}}>Olive</option>
                                            <option style={{color: "cyan", backgroundColor: "cyan"}}>Cyan</option>
                                            <option style={{color: "magenta", backgroundColor: "magenta"}}>Magenta
                                            </option>
                                            <option style={{color: "teal", backgroundColor: "teal"}}>Teal</option>
                                            <option style={{color: "indigo", backgroundColor: "indigo"}}>Indigo</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="More details"
                                        required
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default EditAd;