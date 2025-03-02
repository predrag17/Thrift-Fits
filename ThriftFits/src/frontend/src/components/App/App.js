import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../Home/Home";
import Login from "../LoginAndRegister/Login";
import About from "../About/About";
import Register from "../LoginAndRegister/Register";
import AddAd from "../Ad/AddAd";
import Ads from "../Ad/Ads/Ads";
import EditAd from "../Ad/EditAd";
import Details from "../Ad/Details";
import Info from "../Info/Info";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/add" element={<AddAd/>}/>
                <Route path="/ads/:id/edit" element={<EditAd/>}/>
                <Route path="/ads/:id/details" element={<Details/>}/>
                <Route path="/myAds" element={<Ads/>}/>
                <Route path="/ads" element={<Ads/>}/>
                <Route path="/user/:username" element={<Ads/>}/>
                <Route path="/search" element={<Ads/>}/>
                <Route path="/fave" element={<Info/>}/>
            </Routes>
        </Router>

    );
}

export default App;
