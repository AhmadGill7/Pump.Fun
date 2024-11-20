import axios from "axios";

export const fetchTokens = async (params) => {  
    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
    
    const res = await axios.get(`/api/get-tokens?${queryString}`);
    return res.data;
};
