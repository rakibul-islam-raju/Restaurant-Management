import Buttton from "@/components/utils/Button";
import Image from "next/image";

function Menu({ menu, reverse = false, addToPlateHandler }) {
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
				<div className="">
					<div className="flex justify-between">
						<h5 className="">{menu?.name}</h5>
						<h5 className="text-golden self-start pl-2">
							{menu?.offer_price ? (
								<>
									<del className="text-sm mr-2">৳{menu?.price}</del>
									<span>৳{menu?.offer_price}</span>
								</>
							) : (
								<span>৳{menu?.price}</span>
							)}
						</h5>
					</div>
					<p className="leading-6 mb-4">{menu?.description}</p>
				</div>

				<Buttton
					onClickHandler={() => addToPlateHandler(menu)}
					text="ADD TO PLATE"
				/>
			</div>
		</div>
	);
}

export default Menu;
