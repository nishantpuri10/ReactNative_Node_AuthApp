import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api/v1";
interface LoginRequestBody {
  email: string;
  password: string;
}

interface SingupRequestBody {
  userName: string;
  email: string;
  password: string;
}

export const LoginUser = async (requestBody: LoginRequestBody) => {
  try {
    console.log("Sending request to:", `${API_URL}/login`);
    console.log("Request body:", requestBody);

    const response = await axios.post(`${API_URL}/login`, requestBody);

    console.log("Response received:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );

    // Return a consistent error format
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const SignupUser = async (requestBody: SingupRequestBody) => {
  try {
    const response = await axios.post(`${API_URL}/users`, requestBody);
    console.log("Response received:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Signup failed:",
      error.response?.data?.message || error.message
    );

    // Return a consistent error format
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};
