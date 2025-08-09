import api from "../config/api";

api.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem("token");

        if (jwtToken) {
            config.headers["Authorization"] = `Bearer ${jwtToken}`;
        }
        console.log("Request sent to", config.baseURL);
        return config;
    }, 

    (error) => {
        if (error) {
            console.error("Request error", error);
            return Promise.reject(error);
        }
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        console.log("Response error", error);
        switch(error) {
            case 401:
                console.log("Unauthorized Access");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
                break;
            
            case 403:
                console.error("Forbidden - Insufficient Permission");
                break;

            case 404:
                console.error("Not found - Endpoint doesn't exist");
                break;

             case 422:
                console.error("Validation Error:");
                break;
                    
            case 429:
                console.error("Rate Limited - Too many requests");
                break;
                    
            case 500:
                console.error("Server Error - Something went wrong on the server");
                break;
                    
            default:
                console.error(`HTTP Status Error:`);
        }
    }
)

