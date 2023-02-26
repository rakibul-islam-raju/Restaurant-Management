import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";

export default function App({ Component, pageProps }) {
	return (
		<CartProvider>
			<AuthProvider>
				<ToastContainer />
				<Component {...pageProps} />
			</AuthProvider>
		</CartProvider>
	);
}
