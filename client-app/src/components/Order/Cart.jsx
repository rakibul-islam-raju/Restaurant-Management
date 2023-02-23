import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";
import Buttton from "../utils/Button";

export default function Cart() {
	const {
		cartItems,
		removeItem,
		clearCart,
		increaseItemQuantity,
		decreaseItemQuantity,
	} = useContext(CartContext);

	const handleRemoveItem = (index) => {
		removeItem(index);
	};

	const handleClearCart = () => {
		clearCart();
	};

	const handleIncrease = (index) => {
		increaseItemQuantity(index);
	};

	const handleDecrease = (index) => {
		decreaseItemQuantity(index);
	};

	const orderHandler = () => {};

	const getTotalPrice = () => {
		let total = 0;
		cartItems.forEach((item) => {
			total += item.offer_price
				? item.offer_price * item.quantity
				: item.price * item.quantity;
		});
		return total;
	};

	return (
		<div className="flex flex-col gap-3 mt-4">
			{cartItems?.length > 0 &&
				cartItems?.map((item, i) => {
					const name = item?.name;
					const offer_price = item?.offer_price;
					const price = item?.price;
					const quantity = item?.quantity;

					return (
						<div key={item.id} className="flex justify-between border-b">
							<div>
								<h4>{name}</h4>
								<div className="text-golden text-md font-semibold">
									{offer_price ? (
										<>
											<del className="text-sm text-gray-500">{price}</del>
											<span className="ml-2">{offer_price} ৳</span>
										</>
									) : (
										<span>{price} ৳</span>
									)}
								</div>
							</div>
							<div className="text-lg text-golden font-semibold">
								<div className="div">
									<span className="text-gray-700 font-normal">x</span> (
									{quantity}) <span className="text-gray-700">=</span>{" "}
									{offer_price ? offer_price * quantity : price * quantity} ৳
								</div>
								<div className="flex gap-3 py-1">
									{/* decrese */}
									<button onClick={() => handleDecrease(i)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</button>
									{/* increse */}
									<button onClick={() => handleIncrease(i)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</button>
									<button onClick={() => handleRemoveItem(i)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					);
				})}

			<div className="flex justify-between">
				<div className="font-semibold text-xl">Total</div>
				<div className="font-semibold text-xl">{getTotalPrice()} ৳</div>
			</div>

			<div className="flex justify-between mt-4">
				<button
					onClick={handleClearCart}
					className="py-3 px-3 text-red-500 border border-red-500 hover:text-white bg-white hover:bg-red-500 rounded hover:duration-300"
				>
					Clear Cart
				</button>
				<Buttton onClickHandler={orderHandler} text="Continue Order" />
			</div>
		</div>
	);
}
