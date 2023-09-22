import {
  CURRENT_PAGE,
  FETCH_DATA,
  FILTER_DATA,
  RESET_DATA,
  SEARCH_KEY,
} from "../ActionType";

const initialState = {
  data: [],
  filterlist: [],
  searchItem: "",
  currentPageNo: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case FILTER_DATA:
      return {
        ...state,
        filterlist: action.payload,
      };

    case CURRENT_PAGE:
      return {
        ...state,
        currentPageNo: action.payload,
      };

    case SEARCH_KEY:
      return {
        ...state,
        searchItem: action.payload,
      };

    case RESET_DATA:
      return {
        filterlist: [],
        searchItem: "",
        currentPageNo: null,
      };

    default:
      return state;
  }
};

export default dataReducer;
