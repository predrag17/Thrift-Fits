import axios from '../custom-axios/axios'

const Service = {
    registerUser: (data) => {
        return axios.post("/auth/register", data)
    },

    loginUser: (data) => {
        return axios.post("/auth/authenticate", data)
    },

    addAd: (data) => {

        return axios.post("/ads/add", data);
    },

    editAd: (data, id) => {
        return axios.put(`/ads/${id}/edit`, data);
    },

    fetchAllAds: () => {
        return axios.get("/ads");
    },

    fetchMyAds: () => {
        return axios.get("/ads/myAds");
    },

    fetchImageById: (id) => {
        return axios.get(`/img/${id}/details`);
    },

    fetchNewestAds: () => {
        return axios.get("http://thrift-fits.eu-central-1.elasticbeanstalk.com/api/ads/newest");
    },

    deleteAdById: (id) => {
        return axios.delete(`/ads/${id}/delete`);
    },

    getAdById: (id) => {
        return axios.get(`/ads/${id}/details`);
    },

    getAdsFromUser: (username) => {
        return axios.get(`/user/${username}`)
    },

    filterAds: (formData) => {
        return axios.post("/ads/filtered", formData);
    },

    search: (searchText) => {
        return axios.post("/search", searchText);
    }
}

export default Service