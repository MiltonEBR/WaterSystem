import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainTemplate from "./template";
import NotFound from "../pages/notFound";
import MainView from "../pages/mainView";
import SecondaryView from "../pages/secondaryView";

const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainTemplate />}>
					<Route index path="" element={<MainView />}></Route>
					<Route path="other" element={<SecondaryView />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
