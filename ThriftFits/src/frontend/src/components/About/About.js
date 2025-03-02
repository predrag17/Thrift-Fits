import React from 'react'
import NavBar from "../Layout/NavBar/NavBar";
import '../../index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import AboutImage from '../../assets/aboutImage.png'
import Footer from "../Layout/Footer/Footer";

function About() {

    return (
        <>
            <NavBar/>
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center"
                     style={{paddingTop: "150px"}}>
                    <div>
                        <h1 style={{
                            fontSize: "70px",
                            fontWeight: "bold"
                        }}>About us</h1>
                    </div>

                    <div className="container-fluid d-flex flex-column align-items-center"
                         style={{flexWrap: "wrap"}}>
                        <img src={AboutImage} alt="Image"
                             className="img-fluid rounded mx-auto d-block"
                             style={{width: "60%", height: "auto", marginBottom: "30px"}}/>

                        <div style={{width: "100%", marginBottom: "250px"}}>
                            <p style={{fontSize: "18px"}}>
                                Welcome to ThriftFits, where we make finding and selling second-hand clothes easier than
                                ever before. We're dedicated to providing a platform exclusively for clothing
                                enthusiasts,
                                where you can buy and sell pre-loved apparel with ease.

                                At ThriftFits, we understand the importance of finding the perfect outfit while also
                                being
                                mindful of our environmental footprint. That's why we've created a community-driven
                                marketplace
                                tailored specifically for second-hand clothing. Whether you're hunting for vintage
                                treasures,
                                trendy streetwear, or timeless classics, our platform has something for everyone.
                                Our mission is to revolutionize the way you shop for clothes. With intuitive search
                                features
                                and user-friendly navigation, finding your next wardrobe staple is simple and enjoyable.
                                Say
                                goodbye to endless scrolling through irrelevant listings and hello to a curated
                                selection of
                                high-quality garments waiting to find their new home in your closet.

                                But ThriftFits is more than just a marketplace. It's a community of fashion enthusiasts,
                                eco-conscious shoppers, and sellers passionate about giving clothes a second chance. By
                                choosing
                                to buy and sell on our platform, you're not just making a purchase or earning extra
                                cash—you're
                                contributing to a sustainable fashion movement that values style, affordability, and
                                environmental
                                responsibility.

                                Join us today and be part of the ThriftFits community. Whether you're decluttering your
                                wardrobe, searching for your next fashion statement, or simply browsing for inspiration,
                                we're
                                here to make your second-hand shopping experience seamless and enjoyable.
                                Thank you for choosing ThriftFits. Together, let's redefine the way we shop for clothes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About