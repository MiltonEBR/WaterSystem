import axios from "axios";
import {Backend} from "./../constants";
const API_ROUTE = Backend;

const api = axios.create({
	withCredentials: false,
	baseURL: API_ROUTE,
});

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
	const statusCode = error.response?.status;

	// logging only errors that are not 401
	if (statusCode && statusCode !== 401) {
		// console.error(error);
	}

	return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error: any) => {
	return errorHandler(error);
});

export {api, API_ROUTE};
