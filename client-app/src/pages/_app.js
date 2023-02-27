import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

export default function App({ Component, pageProps }) {
	SwiperCore.use([Autoplay]);
	return (
		<CartProvider>
			<AuthProvider>
				<ToastContainer />
				<Component {...pageProps} />
			</AuthProvider>
		</CartProvider>
	);
}
