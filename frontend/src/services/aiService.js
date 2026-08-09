import api from "./api";

export const analyzeReview = async (review) => {
  const response = await api.post("/api/ai/sentiment", {
    review: review,
  });

  return response.data;
};