import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const cookies = parseCookies();
		const items = cookies.cartItems ? JSON.parse(cookies.cartItems) : [];
		setCartItems(items);
	}, []);

	const setCookieHandler = (cookieName, stringifyData) => {
		setCookie(null, cookieName, stringifyData, {
			path: "/",
			maxAge: 30 * 24 * 60 * 60,
		});
	};

	const addItem = (item, quantity = 1) => {
		const itemIndex = cartItems.findIndex(
			(cartItem) => cartItem.id === item.id
		);

		if (itemIndex === -1) {
			// item does not exist in cart, add it as new item
			setCartItems([...cartItems, { ...item, quantity }]);
		} else {
			// item already exists in cart, update its quantity
			const updatedCartItems = [...cartItems];
			updatedCartItems[itemIndex].quantity += quantity;
			setCartItems(updatedCartItems);
		}
		toast.success("Item has been added to the tray!");
		setCookieHandler("cartItems", JSON.stringify(cartItems));
	};

	const increaseItemQuantity = (index) => {
		const updatedCartItems = [...cartItems];
		updatedCartItems[index].quantity += 1;
		setCartItems(updatedCartItems);

		setCookieHandler("cartItems", JSON.stringify(updatedCartItems));
	};

	const decreaseItemQuantity = (index) => {
		const updatedCartItems = [...cartItems];
		if (updatedCartItems[index].quantity > 1) {
			updatedCartItems[index].quantity -= 1;
			setCartItems(updatedCartItems);

			setCookieHandler("cartItems", JSON.stringify(updatedCartItems));
		}
	};

	const removeItem = (index) => {
		const items = [...cartItems];
		items.splice(index, 1);
		setCartItems(items);
		toast.success("Item has been removed from the tray!");
		setCookieHandler("cartItems", JSON.stringify(items));
	};

	const clearCart = () => {
		setCartItems([]);
		destroyCookie(null, "cartItems", {
			path: "/",
		});
		toast.success("The tray is cleared!");
	};

	const contextValues = {
		cartItems,
		addItem,
		removeItem,
		clearCart,
		increaseItemQuantity,
		decreaseItemQuantity,
	};

	return (
		<CartContext.Provider value={contextValues}>
			{children}
		</CartContext.Provider>
	);
};
