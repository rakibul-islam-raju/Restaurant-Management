import SectionHeader from "@/components/SectionHeader";
import { CartContext } from "@/contexts/CartContext";
import menuService from "@/services/menuService";
import { useContext, useEffect, useState } from "react";
import { ErrorMessage } from "../Messages";
import Menu from "./Menu";

function Specialities() {
	const { addItem } = useContext(CartContext);

	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

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
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
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
		</section>
	);
}

export default Specialities;
