import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer/Footer";
import '../../../index.css'
import Service from "../../../repository/Service";
import AdCard from "../../Layout/AdCard/AdCard";
import './ads.css'

function Ads() {

    const {username} = useParams();
    const location = useLocation();
    const history = useNavigate();
    const [ads, setAds] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [formData, setFormData] = useState({
        clothingName: '',
        clothingBrand: '',
        clothingType: '',
        clothingSize: '',
        clothingColor: ''
    });
    const [sortNewest, setSortNewest] = useState(false);
    const [sortOldest, setSortOldest] = useState(false);
    const [JWT, setJWT] = useState(null);
    const [showNotFoundPopup, setShowNotFoundPopup] = useState(false);
    const [navKey, setNavKey] = useState(0);

    useEffect(() => {
        setNavKey(navKey + 1);
        const token = localStorage.getItem("JWT");

        if (token) {
            setJWT(token);
        }

        if (location.pathname === "/ads") {
            Service.fetchAllAds()
                .then(response => {
                    setAds(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (location.pathname === "/myAds") {
            if (token === null) {
                history("/login")
            } else {
                Service.fetchMyAds()
                    .then(response => {
                        setAds(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        } else if (username) {
            Service.getAdsFromUser(username)
                .then(response => {
                    setAds(response.data)
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (location.pathname === "/search") {
            const searchData = {
                searchText: location.state.searchText
            };

            const params = new URLSearchParams(searchData).toString();

            Service.search(params)
                .then(response => {
                    if (response.data.length === 0) {
                        setAds(response.data);
                        setTimeout(() => {
                            history("/ads");
                        }, 3000);
                    } else {
                        setAds(response.data)
                    }

                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [location.pathname]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(formData).toString();

        Service.filterAds(params)
            .then(response => {
                if (response.data.length === 0) {
                    setShowNotFoundPopup(true);
                    Service.fetchAllAds()
                        .then(response => {
                            setAds(response.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    setTimeout(() => {
                        setShowNotFoundPopup(false);
                    }, 3000);
                } else {
                    setAds(response.data)
                }

                setFormData({
                    clothingName: '',
                    clothingBrand: '',
                    clothingType: '',
                    clothingSize: '',
                    clothingColor: ''
                })
                setShowMenu(!showMenu)

            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleSortSubmit = e => {
        e.preventDefault();
        if (sortNewest) {
            const sortedAds = ads.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAds(sortedAds);
            setSortNewest(false);
        } else if (sortOldest) {
            const sortedAds = ads.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setAds(sortedAds);
            setSortOldest(false);
        }
        setShowMenu(!showMenu);
    };


    return (
        <>
            <NavBar key={navKey}/>


            <div className="content-wrapper" style={{}}>
                {ads.slice().length !== 0 ? (
                    <div className="container-fluid" style={{marginTop: "150px"}}>
                        {location.pathname === "/ads" && (
                            <div className="container-fluid" style={{height: "100%"}}>
                                <h1 style={{textAlign: "center", fontWeight: "bold", marginBottom: "100px"}}>All
                                    Ads!</h1>
                                <button className="btn styled-btn"
                                        onClick={toggleMenu}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                         className="bi bi-filter-right" viewBox="0 0 16 16">
                                        <path
                                            d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5"/>
                                    </svg>
                                    Filter and Sort
                                </button>
                                {showMenu && (
                                    <div className="side-menu" style={{
                                        width: "300px",
                                        position: "fixed",
                                        top: 0,
                                        right: 0,
                                        height: "100%",
                                        backgroundColor: "#E3E6F3",
                                        padding: "20px",
                                        zIndex: "9999",
                                        overflowY: 'auto',
                                    }}>

                                        <div className="d-flex align-items-center" style={{marginBottom: "20px"}}>
                                            <button className="btn" onClick={toggleMenu} style={{marginBottom: "10px"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                     fill="currentColor"
                                                     className="bi bi-x" viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                                </svg>
                                            </button>
                                            <h3>Filter</h3>
                                        </div>

                                        <div style={{marginBottom: "50px"}}>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group" style={{marginBottom: "10px"}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputName"
                                                        placeholder="Enter clothing name"
                                                        name="clothingName"
                                                        value={formData.clothingName}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="form-group" style={{marginBottom: "10px"}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputBrand"
                                                        placeholder="Enter clothing brand"
                                                        name="clothingBrand"
                                                        value={formData.clothingBrand}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="form-group" style={{marginBottom: "10px"}}>
                                                    <select
                                                        className="form-control"
                                                        id="clothingType"
                                                        name="clothingType"
                                                        value={formData.clothingType}
                                                        onChange={handleChange}
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

                                                <div className="form-group" style={{marginBottom: "10px"}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputSize"
                                                        placeholder="Enter clothing size"
                                                        name="clothingSize"
                                                        value={formData.clothingSize}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="form-group" style={{marginBottom: "10px"}}>
                                                    <select
                                                        className="form-control"
                                                        id="clothingColor"
                                                        name="clothingColor"
                                                        value={formData.clothingColor}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Clothing Color</option>
                                                        <option style={{color: "white", backgroundColor: "white"}}>White
                                                        </option>
                                                        <option style={{color: "black", backgroundColor: "black"}}>Black
                                                        </option>
                                                        <option style={{color: "gray", backgroundColor: "gray"}}>Gray
                                                        </option>
                                                        <option style={{color: "red", backgroundColor: "red"}}>Red
                                                        </option>
                                                        <option style={{color: "blue", backgroundColor: "blue"}}>Blue
                                                        </option>
                                                        <option style={{color: "green", backgroundColor: "green"}}>Green
                                                        </option>
                                                        <option
                                                            style={{color: "yellow", backgroundColor: "yellow"}}>Yellow
                                                        </option>
                                                        <option
                                                            style={{color: "orange", backgroundColor: "orange"}}>Orange
                                                        </option>
                                                        <option
                                                            style={{color: "purple", backgroundColor: "purple"}}>Purple
                                                        </option>
                                                        <option style={{color: "pink", backgroundColor: "pink"}}>Pink
                                                        </option>
                                                        <option style={{color: "brown", backgroundColor: "brown"}}>Brown
                                                        </option>
                                                        <option style={{color: "beige", backgroundColor: "beige"}}>Beige
                                                        </option>
                                                        <option style={{color: "navy", backgroundColor: "navy"}}>Navy
                                                        </option>
                                                        <option
                                                            style={{
                                                                color: "turquoise",
                                                                backgroundColor: "turquoise"
                                                            }}>Turquoise
                                                        </option>
                                                        <option
                                                            style={{color: "maroon", backgroundColor: "maroon"}}>Maroon
                                                        </option>
                                                        <option style={{color: "olive", backgroundColor: "olive"}}>Olive
                                                        </option>
                                                        <option style={{color: "cyan", backgroundColor: "cyan"}}>Cyan
                                                        </option>
                                                        <option
                                                            style={{
                                                                color: "magenta",
                                                                backgroundColor: "magenta"
                                                            }}>Magenta
                                                        </option>
                                                        <option style={{color: "teal", backgroundColor: "teal"}}>Teal
                                                        </option>
                                                        <option
                                                            style={{color: "indigo", backgroundColor: "indigo"}}>Indigo
                                                        </option>
                                                    </select>
                                                </div>

                                                <button type="submit" className="btn btn-success">
                                                    Filter
                                                </button>
                                            </form>
                                        </div>

                                        <div>
                                            <h3>Sort</h3>
                                            <form onSubmit={handleSortSubmit}>
                                                <div
                                                    className="form-group d-flex align-items-center justify-content-start"
                                                    style={{marginLeft: '20px'}}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="newestCheckbox"
                                                        style={{border: '3px solid #ccc', padding: '2px'}}
                                                        checked={sortNewest}
                                                        onChange={() => {
                                                            setSortNewest(!sortNewest);
                                                            setSortOldest(false);
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="newestCheckbox"
                                                           style={{
                                                               fontSize: '22px',
                                                               marginTop: '5px',
                                                               marginLeft: '5px'
                                                           }}>Newest</label>
                                                </div>

                                                <div
                                                    className="form-group d-flex align-items-center justify-content-start"
                                                    style={{marginLeft: '20px', marginBottom: '10px'}}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="oldestCheckbox"
                                                        style={{border: '3px solid #ccc', padding: '2px'}}
                                                        checked={sortOldest}
                                                        onChange={() => {
                                                            setSortOldest(!sortOldest);
                                                            setSortNewest(false);
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="oldestCheckbox"
                                                           style={{
                                                               fontSize: '22px',
                                                               marginTop: '5px',
                                                               marginLeft: '5px'
                                                           }}>Oldest</label>
                                                </div>
                                                <button type="submit" className="btn btn-success">
                                                    Sort
                                                </button>
                                            </form>
                                        </div>

                                    </div>
                                )}
                            </div>

                        )}

                        {location.pathname === "/myAds" && (
                            <h1 style={{textAlign: "center", fontWeight: "bold", marginBottom: "50px"}}>Your Added
                                Ads!</h1>
                        )}

                        {username && (
                            <h1 style={{textAlign: "center", fontWeight: "bold", marginBottom: "50px"}}>Ads from user
                                with
                                username: {username}</h1>
                        )}

                        {location.pathname === "/search" && (
                            <h1 style={{textAlign: "center", fontWeight: "bold", marginBottom: "50px"}}> Searched
                                Ads!</h1>
                        )}

                        <div className="container-fluid styled-container">
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
                                {location.pathname !== "/search" ? (
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
                                ) : (
                                    <div className="d-flex flex-column justify-content-between align-items-center">
                                        <p style={{textAlign: "center", fontWeight: "bold", fontSize: "40px"}}>
                                            You can search by Username or Clothing Name. Try again. Redirecting...
                                        </p>

                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                )
                }
            </div>

            {showNotFoundPopup && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nothing Found</h5>
                            </div>
                            <div className="modal-body">
                                <p>There is no Ads with that options. Try Filter again!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    )
}

export default Ads;