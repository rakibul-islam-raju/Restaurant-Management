import Buttton from "@/components/utils/Button";
import Image from "next/image";

function Menu({ value = true }) {
	return (
		<div
			className={`flex flex-col ${
				value ? "md:flex-row" : "md:flex-row-reverse"
			}`}
		>
			<div className="relative h-[250px] md:h-auto md:w-[50%] shrink-0  ">
				<Image
					src={"/breakfast-1.jpg.webp"}
					fill
					alt=" Breakfast"
					className="object-cover object-center"
				/>
			</div>
			<div className="px-5 py-[30px] ">
				<div>
					<div className="flex items-center pb-2 ">
						<h5>Grilled Beef with potatoes</h5>
						<h5 className="text-golden self-start ">$23</h5>
					</div>
				</div>
				<div>
					<p>Meat, Potatoes, Rice, Totatoe </p>
					<Buttton text="Order Now" />
				</div>
			</div>
		</div>
	);
}

export default Menu;
