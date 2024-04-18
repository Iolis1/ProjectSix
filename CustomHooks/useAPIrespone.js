import APIinfo from "../API/APIinfo";
import { useState, useEffect } from "react";

function useAPIresponse() {
    const [searchResult, setSearchResult] = useState([]);
    const [businessDetails, setBusinessDetails] = useState([]);
    const [phoneSearchResult, setPhoneSearchResult] = useState([]);
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

    const searchPhoneAPI = async (userQuery) => {
        try {
            const response = await APIinfo.get('/search/phone', {
                params: {
                    phone: userQuery,
                }
            });
            setPhoneSearchResult(response.data);
        } catch (err) {
            setErrorMessage('Something went wrong');
        }
    };

    useEffect(() => {
        searchAPI('pasta'); 
    }, []);

    return { searchAPI, searchResult, businessDetails, errMessage, fetchBusinessDetails, phoneSearchResult, searchPhoneAPI };
}

export default useAPIresponse;
