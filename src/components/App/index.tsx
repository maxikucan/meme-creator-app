import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../Pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
