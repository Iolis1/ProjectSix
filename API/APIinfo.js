// Description: This file contains the code to make a request to the Yelp API.
import axios from 'axios';

export default axios.create ({

    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer VgxmKWkAl_6LG8peH-RrYr4eY4l32TV5nEBLNZL_6OWTGl5TjCzpKSuLejrwa8dXTABmjgA5wrgry7p9zB-2wSJnxKMUo_MjITxgUvGuvKwu0FJWzRGzgnMoqwgcZnYx'
        
    }
}); 