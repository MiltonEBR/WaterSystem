import React from "react";
import {Outlet} from "react-router-dom";
import NavBar from "../navbar";

const MainTemplate = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
		</div>
	);
};

export default MainTemplate;
