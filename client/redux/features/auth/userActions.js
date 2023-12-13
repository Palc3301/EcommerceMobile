import { server } from "../../store";
import axios from "axios";
// action login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    // hitting node login api request
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "logingSucess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}/user/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "registerSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};
