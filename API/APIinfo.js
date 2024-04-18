// Description: This file contains the code to make a request to the Yelp API.
import axios from 'axios';

export default axios.create ({

    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer '
        
    }
}); 