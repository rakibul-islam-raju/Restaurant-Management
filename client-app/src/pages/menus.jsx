import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Header/Navbar";
import Topbar from "@/components/Header/Topbar";
import SectionHeader from "@/components/SectionHeader";
import Menu from "@/components/Sepcialities/Menu";
import categoryService from "@/services/categoryService";
import menuService from "@/services/menuService";
import Head from "next/head";
import { useEffect, useState } from "react";
import { WarningMessage } from "../components/Messages";

export default function menus() {
	const [menus, setMenus] = useState(null);
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [tabState, setTabState] = useState(null);

	const fetchMenus = async (params) => {
		setErrorMessage(null);
		try {
			const res = await menuService.getMenus(params);
			if (res?.results) {
				setMenus(res);
			}
		} catch (err) {
			setErrorMessage(err?.data?.details || "Something went wrong!");
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
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const params = {};
		if (tabState) {
			params.category = tabState;
		}
		fetchMenus(params);
	}, [tabState]);

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

			<section className="">
				<Topbar />
				<Navbar />
				<Breadcrumb />

				<div className="wrapper">
					<SectionHeader upperText={"Menus"} lowerText={"Menu"} />
					{loading ? (
						<h6 className="text-center">Loading...</h6>
					) : (
						<>
							<div className="w-full flex items-center justify-evenly border rounded mb-28 overflow-x-scroll md:overflow-x-auto">
								{categories?.results?.length > 0 ? (
									categories?.results?.map((item) => (
										<div className="w-full text-center min-w-[100px]">
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

							<div className="grid grid-cols-1 gap-3">
								{menus?.results?.length > 0 ? (
									menus?.results?.map((item) => (
										<Menu menu={item} key={item.id} reverse />
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
