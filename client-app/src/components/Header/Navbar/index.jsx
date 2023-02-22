"use client";

import Auth from "@/components/Auth";
import Modal from "@/components/Modal";
import Plate from "@/components/Order/Plate";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import usePlate from "@/hooks/usePlate";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useState } from "react";
import NavLinks from "../Navlink";

export default function Navbar() {
	const [isAuthenticated, user] = useIsAuthenticated();
	const [plate] = usePlate();

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

	console.log("plate =>", plate);

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
						navbar ? " md:my-0" : "md:my-4  "
					} flex items-center md:max-w-6xl mx-auto  p-4  pb-4 md:py-0  `}
				>
					<Link
						className={`${
							navbar ? "md:text-black " : "md:text-white"
						} font-semibold text-2xl text-white`}
						href="/"
					>
						Take My Order
					</Link>

					<div
						className={
							" md:static md:bg-transparent fixed bottom-0   left-0 right-0    md:border-0 border-t-[1px]   shadow-inner md:shadow-none  bg-gray-100 md:bg-none md:ml-auto m-0 px-4 py-2 md:py-0 "
						}
					>
						<ul className="flex items-center flex-row transition-all duration-200 ease-in justify-between">
							<NavLinks value={navbar} />
						</ul>
					</div>
					<div className="ml-auto flex gap-3 items-center">
						{plate?.length > 0 && (
							<div className="">
								<button
									type="button"
									onClick={openPlateModal}
									className="text-golden font-semibold bg-white p-1 rounded shadow"
								>
									PLATE
									<sup>{plate?.length}</sup>
								</button>
							</div>
						)}
						{isAuthenticated ? (
							<div className="relative group">
								<button
									type="button"
									className="bg-golden text-white px-4 py-2 text-lg flex items-center gap-2"
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
								className="bg-golden text-white px-4 py-2 text-lg"
							>
								Login
							</button>
						)}
					</div>
				</div>
			</nav>
			{open && (
				<Modal handleClose={modalCloser}>
					{open === "auth" ? <Auth /> : <Plate />}
				</Modal>
			)}
		</>
	);
}
