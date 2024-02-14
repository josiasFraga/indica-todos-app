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
 service_subcategories: [],
 service_subcategories_loading: false,
 service_measurement_units: [],
 service_measurement_units_loading: false,
 dashboard_data: {
  "visits": 0,
  "visits_uniqes": 0,
  "phone_clicks": 0,
  "week_avg": 0
 },
 is_dashboard_data_loading: false,
 business_data: {},
 is_business_data_loading: false,
 my_services: [],
 is_my_services_loading: false,
 services: [],
 is_services_loading: false,
 reviews: [],
 is_reviews_loading: false,
 photo_gallery: [],
 is_photo_gallery_loading: false,
 neighborhoods: [],
 is_neighborhoods_loading: false,
 selecteds_neighborhoods: ''
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
  
    case 'LOAD_SERVICE_SUBCATEGORIES':
		return {...state, service_subcategories_loading: true};
    case 'LOAD_SERVICE_SUBCATEGORIES_SUCCESS':
		return {...state, service_subcategories: action.payload, service_subcategories_loading: false };
    case 'LOAD_SERVICE_SUBCATEGORIES_FAILED':
		return {...state, service_subcategories_loading: false};
  
    case 'LOAD_MEASUREMENT_UNITS':
		return {...state, service_measurement_units_loading: true};
    case 'LOAD_MEASUREMENT_UNITS_SUCCESS':
		return {...state, service_measurement_units: action.payload, service_measurement_units_loading: false };
    case 'LOAD_MEASUREMENT_UNITS_FAILED':
		return {...state, service_measurement_units_loading: false};
  
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
		return {...state, user_data: INITIAL_STATE.user_data, user_data_loading: false};
  
    case 'LOAD_DASHBOARD_DATA':
		return {...state, is_dashboard_data_loading: true};
    case 'LOAD_DASHBOARD_DATA_SUCCESS':
		return {...state, dashboard_data: action.payload, is_dashboard_data_loading: false };
    case 'LOAD_DASHBOARD_DATA_FAILED':
		return {...state, is_dashboard_data_loading: false};
  
    case 'LOAD_BUSINESS_DATA':
		return {...state, business_data: {}, is_business_data_loading: true};
    case 'LOAD_BUSINESS_DATA_SUCCESS':
		return {...state, business_data: action.payload, is_business_data_loading: false };
    case 'LOAD_BUSINESS_DATA_FAILED':
		return {...state, business_data: {}, is_business_data_loading: false};
  
    case 'LOAD_MY_SERVICES':
		return {...state, my_services: [], is_my_services_loading: true};
    case 'LOAD_MY_SERVICES_SUCCESS':
		return {...state, my_services: action.payload, is_my_services_loading: false };
    case 'LOAD_MY_SERVICES_FAILED':
		return {...state, my_services: [], is_my_services_loading: false};

    case 'LOAD_SERVICES':
		return {...state, services: [], is_services_loading: true};
    case 'LOAD_SERVICES_SUCCESS':
		return {...state, services: action.payload, is_services_loading: false };
    case 'LOAD_SERVICES_FAILED':
		return {...state, services: [], is_services_loading: false}; 

    case 'LOAD_REVIEWS':
		return {...state, reviews: [], is_reviews_loading: true};
    case 'LOAD_REVIEWS_SUCCESS':
		return {...state, reviews: action.payload, is_reviews_loading: false };
    case 'LOAD_REVIEWS_FAILED':
		return {...state, reviews: [], is_reviews_loading: false}; 

    case 'LOAD_PHOTO_GALLERY':
		return {...state, photo_gallery: [], is_photo_gallery_loading: true};
    case 'LOAD_PHOTO_GALLERY_SUCCESS':
		return {...state, photo_gallery: action.payload, is_photo_gallery_loading: false };
    case 'LOAD_PHOTO_GALLERY_FAILED':
		return {...state, photo_gallery: [], is_photo_gallery_loading: false}; 
  
    case 'LOAD_NEIGHBORHOODS':
		return {...state, neighborhoods: [], is_neighborhoods_loading: true};
    case 'LOAD_NEIGHBORHOODS_SUCCESS':
		return {...state, neighborhoods: action.payload, is_neighborhoods_loading: false };
    case 'LOAD_NEIGHBORHOODS_FAILED':
		return {...state, is_neighborhoods_loading: false}; 
  
    case 'SET_SELECTEDS_NEIGHBORHOODS':
		return {...state, selecteds_neighborhoods: action.payload };
    
    default:
		return state;
  }
};
