//import IMAGES from "@constants/images";

const INITIAL_STATE = {
 user_location: {},
 user_location_loading: false,
 service_categories: [],
 service_categories_loading: false,
 service_providers: [],
 service_providers_loading: false,
 user_data: {
  name: "Visitante",
  phone: ""
 },
 user_data_loading: false,
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  
    case 'LOGIN':
		return {...state, is_logging_in: true};
    case 'LOGIN_SUCCESS':
		return {...state, is_logging_in: false};
    case 'LOGIN_FAILED':
		return {...state, is_logging_in: false};
  
    case 'LOAD_USER_LOCATION':
		return {...state, user_location_loading: true};
    case 'LOAD_USER_LOCATION_SUCCESS':
		return {...state, user_location: action.payload, user_location_loading: false };
    case 'LOAD_USER_LOCATION_FAILED':
		return {...state, user_location_loading: false};
  
    case 'LOAD_SERVICE_CATEGORIES':
		return {...state, service_categories_loading: true};
    case 'LOAD_SERVICE_CATEGORIES_SUCCESS':
		return {...state, service_categories: action.payload, service_categories_loading: false };
    case 'LOAD_SERVICE_CATEGORIES_FAILED':
		return {...state, service_categories_loading: false};
  
    case 'LOAD_SERVICE_PROVIDERS':
		return {...state, service_providers_loading: true};
    case 'LOAD_SERVICE_PROVIDERS_SUCCESS':
		return {...state, service_providers: action.payload, service_providers_loading: false };
    case 'LOAD_SERVICE_PROVIDERS_FAILED':
		return {...state, service_providers_loading: false};
  
    case 'LOAD_USER_DATA':
		return {...state, user_data_loading: true};
    case 'LOAD_USER_DATA_SUCCESS':
		return {...state, user_data: action.payload, user_data_loading: false };
    case 'LOAD_USER_DATA_FAILED':
		return {...state, user_data_loading: false};
    
    default:
		return state;
  }
};
