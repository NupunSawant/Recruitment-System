import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./Routes/router";
import { store } from "./store";
import { theme } from "./theme/theme";
import { AuthProvider } from "./context/AuthContext"; // ✅ ADD THIS

function App(props: any) {
	const { "data-fg-d3bl1": _, "data-fgid-d3bl1": __, ...cleanProps } = props;

	return (
		<Provider store={store}>
			<AuthProvider>
				{" "}
				{/* ✅ WRAP HERE */}
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<RouterProvider router={router} />
				</ThemeProvider>
			</AuthProvider>
		</Provider>
	);
}

export default App;
