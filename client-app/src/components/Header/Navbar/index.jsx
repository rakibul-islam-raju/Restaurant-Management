"use client";

import Auth from "@/components/Auth";
import Modal from "@/components/Modal";
import Cart from "@/components/Order/Cart";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";
import NavLinks from "../Navlink";

export default function Navbar() {
	const { cartItems, removeItem, clearCart } = useContext(CartContext);
	const { isAuthenticated, user } = useContext(AuthContext);

	const [navbar, setNavbar] = useState(false);
	const [open, setOpen] = useState(null);

	const modalCloser = () => setOpen(null);
	const openAuthModal = () => setOpen("auth");
	const openPlateModal = () => setOpen("plate");

	const changeBackground = () => {
		if (window.scrollY >= 80) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	if (typeof window != "undefined") {
		window.addEventListener("scroll", changeBackground);
	}

	const handleLogout = () => {
		destroyCookie(null, "access");
		destroyCookie(null, "refresh");
		window.location.href = "/";
	};

	return (
		<>
			<nav
				className={`${
					navbar
						? "md:bg-gray-200 md:fixed md:transition md:duration-300  top-0 left-0 right-0 md:ease-out md:shadow-lg "
						: "md:bg-transparent md:absolute md:top-[40px] border-gray-700 "
				} fixed top-0  md:border-b-[1px] bg-golden md:bg-none z-30 w-full `}
			>
				<div
					className={`${
						navbar ? " md:my-0" : "md:my-4 "
					} flex items-center justify-between md:max-w-6xl mx-auto p-4 pb-4 md:py-0`}
				>
					<Link
						className={`${
							navbar ? "md:text-black " : "md:text-white"
						} font-semibold text-2xl text-white`}
						href="/"
					>
						Take My Order
					</Link>

					<div className="flex items-center">
						<div
							className={
								" md:static md:bg-transparent fixed bottom-0 left-0 right-0 md:border-0 border-t-[1px] shadow-inner md:shadow-none  bg-gray-100 md:bg-none md:ml-auto m-0 px-4 py-2 md:py-0 "
							}
						>
							<ul className="flex items-center flex-row transition-all duration-200 ease-in justify-between">
								<NavLinks value={navbar} />
							</ul>
						</div>
						<div className="flex gap-3 items-center">
							{cartItems?.length > 0 && (
								<div className="">
									<button
										type="button"
										onClick={openPlateModal}
										className="text-golden font-semibold bg-white p-1 rounded shadow relative text-sm"
									>
										<span className="absolute -top-2 bg-red-500 text-white rounded w-6 h-6 text-sm font-semibold">
											{cartItems?.length}
										</span>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
											/>
										</svg>
									</button>
								</div>
							)}
							{isAuthenticated ? (
								<div className="relative group">
									<button
										type="button"
										className="bg-white md:bg-golden text-golden md:text-white px-4 py-2 text-lg flex items-center gap-2"
									>
										<i className="bx bxs-user-circle"></i>
										{user?.first_name}
									</button>
									{/* dropdown menus */}
									<div className="hidden group-hover:block absolute w-full transition">
										<ul className="bg-white shadow-lg w-full p-2 flex flex-col gap-1">
											<li className="text-gray-700 font-semibold hover:text-golden transition">
												<Link className="block" href={"/profile"}>
													Profile
												</Link>
											</li>
											<li className="text-gray-700 font-semibold hover:text-golden transition">
												<button
													className="block w-full text-left"
													type="button"
													onClick={handleLogout}
												>
													Logout
												</button>
											</li>
										</ul>
									</div>
								</div>
							) : (
								<button
									type="button"
									onClick={openAuthModal}
									className="bg-white md:bg-golden text-golden md:text-white px-4 py-2 text-lg"
								>
									Login
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>
			{open && (
				<Modal handleClose={modalCloser}>
					{open === "auth" ? <Auth handleClose={modalCloser} /> : <Cart />}
				</Modal>
			)}
		</>
	);
}
