import Link from "next/link";

const NavLinks = ({ value }) => {
	const Links = [
		{
			name: "Home",
			link: "/",
			icon: "bx bx-home",
		},
		{
			name: "About",
			link: "/#about",
			icon: "bx bx-info-circle",
		},
		{
			name: "Menu",
			link: "/menus",
			icon: "bx bx-food-menu",
		},
		{
			name: "Contact",
			link: "/",
			icon: "bx bx-message-square-dots",
		},
	];

	return (
		<>
			{Links.map((link, i) => (
				<li key={i} className=" hover:text-yellow-600 ">
					<Link
						className={` ${
							value
								? " md:text-black  nav-button  "
								: " md:text-white  nav-button     "
						}hover:text-yellow-500  flex flex-col items-center `}
						href={link.link}
					>
						{link.name != "Book a Table" && (
							<span className="text-2xl md:hidden">
								<i className={`${link.icon}`}></i>
							</span>
						)}

						{link.name}
					</Link>
				</li>
			))}
		</>
	);
};

export default NavLinks;
