import Buttton from "@/components/utils/Button";
import Image from "next/image";

function Menu({ menu, reverse = false, addTocartHandler }) {
	return (
		<div
			className={`flex flex-col ${
				reverse ? "md:flex-row" : "md:flex-row-reverse"
			} justify-between`}
		>
			<div className="relative min-h-[250px] md:h-auto w-full md:w-6/12 shrink-0  ">
				<Image
					src={menu?.image}
					fill
					alt={menu?.name}
					className="object-cover object-center"
				/>
			</div>
			<div className="w-full md:w-6/12 p-4 flex flex-col items-start justify-evenly">
				<div className="flex items-center justify-between w-full ">
					<h4 className="text-gray-800">{menu?.name}</h4>
					<h4 className="text-golden">
						{menu?.offer_price ? (
							<>
								<span>
									<del className="text-sm">{menu?.price}</del>{" "}
									{menu?.offer_price}৳
								</span>
							</>
						) : (
							<span>৳{menu?.price}</span>
						)}
					</h4>
				</div>
				<p className="leading-6 mb-4">{menu?.description}</p>

				<div className="">
					<span className="text-md font-semibold text-gray-700">
						Cook Time:
					</span>{" "}
					<span className="">{menu?.cook_time} mins</span>
				</div>

				<Buttton
					onClickHandler={() => addTocartHandler(menu)}
					text="ADD TO TRAY"
				/>
			</div>
		</div>
	);
}

export default Menu;
