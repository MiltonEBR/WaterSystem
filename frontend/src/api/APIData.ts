import {api, API_ROUTE} from "./axiosConfig";

export const DataAPI = {
	getBoxPlot: function (initialDate: string, finalDate: string) {
		return api
			.request({
				url: `/api/daily/discharge_monthlySummary/`,
				method: "POST",
				headers: {mode: "no-cors"},
				data: {
					sites: [
						"06670500",
						"06657000",
						"06656000",
						"06652800",
						"06650000",
						"06645000",
						"06643500",
						"06642000",
						"06641000",
						"06636000",
						"06635000",
						"06630000",
						"06627000",
						"06620000",
					],
					start: initialDate,
					end: finalDate,
				},
			})
			.then((response: any) => {
				// console.log("todo bien", response.data.data);
				return response.data;
			})
			.catch((error: any) => {
				console.log("Hubo un error");
				if (error.response) {
					console.log(error.response.data);
				}
				throw new Error(error);
			});
	},
};
