import APIinfo from "../API/APIinfo";
import { useState, useEffect } from "react";

function useAPIresponse() {
    const [searchResult, setSearchResult] = useState([]);
    const [businessDetails, setBusinessDetails] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [errMessage, setErrorMessage] = useState('');
    const searchAPI = async (userQuery) => {
        try {
            const response = await APIinfo.get('/search', {
                params: {
                    term: userQuery,
                    location: 'grand rapids',
                    limit: 50
                }
            });
            setSearchResult(response.data.businesses);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    const fetchBusinessDetails = async (businessId) => {
        try {
            const response = await APIinfo.get(`/${businessId}`);
            setBusinessDetails(response.data);
        } catch (err) {
            setErrorMessage('Failed to fetch business details');
            
        }
    };

    const fetchBusinessReviews = async (businessId) => {
        console.log(businessId);
        try {
            const response = await APIinfo.get(`/${businessId}/reviews`);
            setReviews(response.data.reviews);
        } catch (err) {
            setErrorMessage('Failed to fetch business reviews');
        }
    };

    useEffect(() => {
        searchAPI('pasta'); 
    }, []);

    return { searchAPI, searchResult, businessDetails, reviews, errMessage, fetchBusinessDetails, fetchBusinessReviews };
}

export default useAPIresponse;
