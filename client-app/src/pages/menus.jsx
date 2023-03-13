import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Header/Navbar";
import Topbar from "@/components/Header/Topbar";
import Loader from "@/components/Loader";
import SectionHeader from "@/components/SectionHeader";
import Menu from "@/components/Sepcialities/Menu";
import { CartContext } from "@/contexts/CartContext";
import categoryService from "@/services/categoryService";
import menuService from "@/services/menuService";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { WarningMessage } from "../components/Messages";

const SELECT_OPTIONS = [
	{ value: "", label: "Latest" },
	{ value: "price", label: "Price (Low > High)" },
	{ value: "-price", label: "Price (High > Low)" },
	{ value: "avg_rating", label: "Rating (Low > High)" },
	{ value: "-avg_rating", label: "Rating (High > Low)" },
	{ value: "cook_time", label: "Cooking Time (Low > High)" },
	{ value: "-cook_time", label: "Cooking Time (High > Low)" },
];

export default function menus() {
	const { addItem } = useContext(CartContext);

	const [menus, setMenus] = useState(null);
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [tabState, setTabState] = useState(null);
	const [ordering, setOrdering] = useState("");

	const fetchMenus = async (params) => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await menuService.getMenus(params);
			if (res?.results) {
				setMenus(res);
			}
		} catch (err) {
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const fetchCategories = async (params) => {
		setErrorMessage(null);
		try {
			const res = await categoryService.getCategories(params);
			if (res?.results) {
				setCategories(res);

				// set category for the first time
				if (!tabState && res?.results.length > 0)
					setTabState(res.results[0].id);
			}
		} catch (err) {
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const handleAddToCart = (item) => {
		addItem(item);
	};

	useEffect(() => {
		const params = {};
		if (tabState) {
			if (ordering !== "") params.ordering = ordering;

			params.category = tabState;
		}
		fetchMenus(params);
	}, [tabState, ordering]);

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<>
			<Head>
				<title>Menus | Take My Order</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<section className="relative">
				<Topbar />
				<Navbar />
				<Breadcrumb />

				<div className="wrapper">
					<SectionHeader upperText={"Menus"} lowerText={"Menu"} />
					{loading ? (
						<Loader />
					) : (
						<>
							<div className="w-full flex flex-col md:flex-row items-center justify-evenly border rounded mb-28">
								{categories?.results?.length > 0 ? (
									categories?.results?.map((item) => (
										<div
											key={item.id}
											className="w-full text-center min-w-[100px]"
										>
											<div
												className={`${
													tabState === item.id
														? "bg-golden text-white"
														: "bg-white text-golden"
												} uppercase px-2 py-2 rounded cursor-pointer transition`}
												onClick={() => setTabState(item.id)}
											>
												{item.name}
											</div>
										</div>
									))
								) : (
									<WarningMessage text="No data found!" />
								)}
							</div>

							<div className="flex justify-end mb-4">
								<select
									defaultValue={""}
									onChange={(e) => setOrdering(e.target.value)}
									className="px-3 py-1 rounded font-semibold ring ring-golden ring-offset-1"
								>
									{SELECT_OPTIONS.map((opt) => (
										<option key={opt.value} value={opt.value}>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							<div className="grid grid-cols-1 gap-3">
								{menus?.results?.length > 0 ? (
									menus?.results?.map((item) => (
										<Menu
											menu={item}
											key={item.id}
											addTocartHandler={handleAddToCart}
											reverse
										/>
									))
								) : (
									<WarningMessage text="No data found!" />
								)}
							</div>
						</>
					)}
				</div>

				<Footer />
			</section>
		</>
	);
}
