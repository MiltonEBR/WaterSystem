import React, {useRef} from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
	data: any;
}

export const ChartBoxPlot = (props: Props) => {
	const options: any = {
		chart: {
			type: "boxPlot",
			height: 400,
			colors: ["#008FFB", "#FEB019"],
			title: {
				text: "BoxPlot - Scatter Chart",
				align: "left",
			},
			xaxis: {
				type: "datetime",
				tooltip: {
					formatter: function (val: any) {
						const [month, year] = val.split("-");
						const date = new Date(`${year}-${month}-01`);
						console.log(date);
						return date.getFullYear();
					},
				},
			},
			zoom: {
				enabled: true,
				type: "x",
				autoScaleYaxis: true,
				fill: {
					color: "#90CAF9",
					opacity: 0.4,
				},
				stroke: {
					color: "#0D47A1",
					opacity: 0.4,
					width: 1,
				},
			},
			toolbar: {
				autoSelected: "zoom",
			},
			tooltip: {
				shared: false,
				intersect: true,
			},
		},
		title: {
			text: "BoxPlot Chart",
			align: "left",
		},
		plotOptions: {
			boxPlot: {
				colors: {
					upper: "#FEB019",
					lower: "#008FFB",
				},
				dataLabels: {
					position: "center",
					offsetX: 0,
					offsetY: -20,
					style: {
						fontSize: "12px",
						fontWeight: "bold",
						colors: ["#000"],
					},
					formatter: function (val: any, {seriesIndex, dataPointIndex}: any) {
						return String(dataPointIndex + 1);
					},
				},
			},
		},
	};
	const data: any = [
		{
			type: "boxPlot",
			data: props.data,
		},
	];

	return (
		<ReactApexChart
			options={options}
			series={data}
			type="boxPlot"
			height={350}
		/>
	);
};
