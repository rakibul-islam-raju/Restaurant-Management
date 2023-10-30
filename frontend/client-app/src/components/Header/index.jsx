import Image from "next/image";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

function Header() {
	return (
		<div className="">
			<Topbar />
			<Navbar />
			<section className="relative bg-gradient-to-br w-full h-screen from-gray-800 to-gray-600  ">
				<div className=" md:top-0 h-screen top-16  mix-blend-overlay z-0 opacity-80 ">
					<Image
						src={"/bg_1.jpg.webp"}
						fill
						alt=" Food Background"
						className="object-cover object-center md:object-center"
					/>
				</div>
				<div className="absolute text-center right-0 left-0  top-[40%] md:top-[35%] text-white">
					<p className="text-[80px] great-font ">Slice of Spice</p>
					<h1 className="uppercase">Slice of Spice</h1>

					<div className="flex justify-center text-golden mt-24">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-12 h-12 animate-bounce"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
							/>
						</svg>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Header;
