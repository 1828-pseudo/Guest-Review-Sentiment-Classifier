import axios from "axios";

const API = "http://127.0.0.1:8000/api/ai";

export const analyzeReview = async (review) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API}/sentiment`,
        { review },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};