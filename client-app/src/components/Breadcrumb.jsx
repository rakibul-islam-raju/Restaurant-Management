import Image from "next/image";

export default function Breadcrumb() {
	return (
		<section className="relative bg-gradient-to-br w-full h-56  from-gray-800 to-gray-600  ">
			<div className="md:top-0 h-72 top-16 mix-blend-overlay z-0 opacity-80 ">
				<Image
					src={"/bg_1.jpg.webp"}
					fill
					alt="Food Background"
					className="object-cover object-center md:object-center"
				/>
			</div>
		</section>
	);
}
