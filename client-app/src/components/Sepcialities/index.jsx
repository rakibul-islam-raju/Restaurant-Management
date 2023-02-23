import SectionHeader from "@/components/SectionHeader";
import { CartContext } from "@/contexts/CartContext";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import menuService from "@/services/menuService";
import { useContext, useEffect, useState } from "react";
import Auth from "../Auth";
import { ErrorMessage } from "../Messages";
import Modal from "../Modal";
import Order from "../Order/Order";
import Menu from "./Menu";

function Specialities() {
	const [isAuthenticated] = useIsAuthenticated();

	const { addItem } = useContext(CartContext);

	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	const [openModal, setOpenModal] = useState(false);

	const handleClose = () => setOpenModal(false);

	const handleAddToCart = (item) => {
		addItem(item);
	};

	const fetchMenus = async () => {
		setErrorMessage(null);
		try {
			const res = await menuService.getFeaturedMenus();
			if (res?.results?.length) {
				setMenus(res.results);
			}
		} catch (err) {
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMenus();
	}, []);

	return (
		<section className=" wrapper">
			<SectionHeader upperText={"Specialities"} lowerText={"Menu"} />

			{errorMessage && <ErrorMessage text={errorMessage} />}

			<div className="grid grid-cols-1 md:grid-cols-2 border-2">
				{loading ? (
					<h4>Loading...</h4>
				) : (
					menus?.length > 0 &&
					menus?.map((item, i) => {
						if (i === 2 || i === 3) {
							return (
								<Menu
									menu={item}
									key={item.id}
									addTocartHandler={handleAddToCart}
								/>
							);
						} else {
							return (
								<Menu
									menu={item}
									key={item.id}
									addTocartHandler={handleAddToCart}
									reverse
								/>
							);
						}
					})
				)}
			</div>

			{/* modal */}
			{openModal && (
				<Modal handleClose={handleClose}>
					{!isAuthenticated ? <Auth /> : <Order />}
				</Modal>
			)}
		</section>
	);
}

export default Specialities;
