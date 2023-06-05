import {useState} from "react";
import {useQuery} from "react-query";
import {DataAPI} from "../../api";
import {ChartBoxPlot} from "../../components/BoxPlot";
import {Loader} from "../../components/loader";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function MainView() {
	//data
	const [data, setData] = useState<any>([]);
	//dates
	const [initialDate, setInitialDate] = useState<string>("21 Oct 2022");
	const [inputInitialDate, setInputInitialDate] = useState<string>("");
	//
	const [endDate, setEndDate] = useState<string>("28 Oct 2023");
	const [inputEndDate, setInputEndDate] = useState<string>("");
	//refetch
	const [refresh, setRefresh] = useState<boolean>(false);

	const {
		isLoading,
		data: leads,
		isError,
		error,
	} = useQuery({
		queryKey: [`data-boxPlot`, [refresh]],
		queryFn: () => DataAPI.getBoxPlot(initialDate, endDate),
		onSuccess: (data: any) => {
			console.log(data);
			setData(data);
		},
		staleTime: 15 * (60 * 1000), // 15 mins
		cacheTime: 20 * (60 * 1000), // 20 mins
	});

	if (isLoading) {
		return (
			<div className="row">
				<div className={`col-xs-12 loaderContainer`}>
					<Loader />
				</div>
			</div>
		);
	}

	return (
		<div className="App">
			<div>
				<h2>Water Report</h2>
				<label htmlFor="">Initial Date</label>
				<input
					type="date"
					value={inputInitialDate}
					onChange={(e) => {
						setInputInitialDate(e.target.value);
						//TODO: bug con el uso horario, toma un día antes
						// console.log("obj: ", e.target.value);
						let date: Date = new Date(e.target.value);
						// console.log("date: ", date);
						let tempDate: string = `${date.getDate()} ${
							monthNames[date.getMonth()]
						} ${date.getFullYear()}`;
						// console.log("tempDate:", tempDate);

						setInitialDate(tempDate);
					}}
				/>
				<br />
				<label htmlFor="">End Date</label>
				<input
					type="date"
					value={inputEndDate}
					onChange={(e) => {
						setInputEndDate(e.target.value);
						// console.log("obj: ", e.target.value);
						let date: Date = new Date(e.target.value);
						// console.log("date: ", date);
						let tempDate: string = `${date.getDate()} ${
							monthNames[date.getMonth()]
						} ${date.getFullYear()}`;
						// console.log("tempDate:", tempDate);

						setEndDate(tempDate);
					}}
				/>
				<br />
				<button
					onClick={() => {
						// console.log(initialDate, endDate);
						setRefresh(!refresh);
					}}
				>
					actualizar
				</button>
				{data.map((chartData: any, index: number) => {
					let newData: any = [];
					chartData.values.map((element: any) => {
						// console.log(element);
						newData.push({
							x: element.month,
							y: element.discharges,
						});
					});
					return (
						<div key={index}>
							<h2>{chartData.siteName}</h2>
							<ChartBoxPlot data={newData} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MainView;
