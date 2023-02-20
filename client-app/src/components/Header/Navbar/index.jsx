"use client";

import Auth from "@/components/Auth";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useState } from "react";
import NavLinks from "../Navlink";

export default function Navbar() {
	const [navbar, setNavbar] = useState(false);
	const [open, setOpen] = useState(false);

	const isAuthenticated = false;

	const modalCloser = () => setOpen(false);
	const modalOper = () => setOpen(true);

	const changeBackground = () => {
		if (window.scrollY >= 80) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};
	// useEffect(() => {

	// }, []);
	if (typeof window != "undefined") {
		window.addEventListener("scroll", changeBackground);
	}
	return (
		<>
			<nav
				className={`${
					navbar
						? "md:bg-gray-200 md:fixed md:transition md:duration-300  top-0 left-0 right-0 md:ease-out md:shadow-lg "
						: "md:bg-transparent md:absolute md:top-[40px] border-gray-700 "
				} fixed top-0  md:border-b-[1px] bg-golden md:bg-none z-50 w-full `}
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
					<div className=" text-white md:text-golden hover:opacity-80 text-2xl ml-auto cursor-pointer">
						{isAuthenticated ? (
							<i class="bx bxs-user-circle"></i>
						) : (
							<button
								onClick={modalOper}
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
					<Auth />
				</Modal>
			)}
		</>
	);
}
