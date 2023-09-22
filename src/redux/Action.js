import { CURRENT_PAGE, FETCH_DATA, FILTER_DATA, RESET_DATA, SEARCH_KEY } from "./ActionType";
import Instance from "../api/ApiConfig";

export const fetchData = () => {
  return (dispatch) => {
    Instance.get("/todos").then((res) => {
      const response = res.data;

      dispatch({
        type: FETCH_DATA,
        payload: response,
      });
    });
  };
};

export const currentPageAction = (pageno) => {
  return {
    type: CURRENT_PAGE,
    payload: pageno,
  };
};

export const filterResult = (data) => {
  return {
    type: FILTER_DATA,
    payload: data,
  };
};


export const searchKeys = (data) => {
    return {
      type: SEARCH_KEY,
      payload: data,
    };
  };


export const resetData = () => {
  return {
    type: RESET_DATA,
  };
};
