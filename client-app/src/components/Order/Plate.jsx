import usePlate from "@/hooks/usePlate";

export default function Plate() {
	const [plate] = usePlate();
	return (
		<div className="flex flex-col gap-3 mt-4">
			{plate?.length > 0 &&
				plate?.map((item, i) => {
					const name = item?.name;
					const offer_price = item?.offer_price;
					const price = item?.price;
					const quantity = item?.quantity;

					return (
						<div
							key={item.id}
							className={`${i > 0 && "border-t pt-1"} flex justify-between`}
						>
							<div>
								<h4>{name}</h4>
								<div className="text-golden text-md font-semibold">
									{offer_price ? (
										<>
											<del className="text-sm text-gray-500">{price}</del>
											<span className="ml-2">{offer_price}</span>
										</>
									) : (
										<span>{price}</span>
									)}
								</div>
							</div>
							<div className="text-lg text-golden font-semibold">
								<span className="text-gray-700 font-normal">x</span> ({quantity}
								) <span className="text-gray-700">=</span>{" "}
								{offer_price ? offer_price * quantity : price * quantity}
							</div>
						</div>
					);
				})}
		</div>
	);
}
