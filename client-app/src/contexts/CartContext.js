import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

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

		setCookieHandler("cartItems", JSON.stringify(cartItems));
		// setCookie(null, "cartItems", JSON.stringify(cartItems), {
		// 	path: "/",
		// 	maxAge: 30 * 24 * 60 * 60,
		// });
	};

	const increaseItemQuantity = (index) => {
		const updatedCartItems = [...cartItems];
		updatedCartItems[index].quantity += 1;
		setCartItems(updatedCartItems);

		setCookieHandler("cartItems", JSON.stringify(updatedCartItems));
		// setCookie(null, "cartItems", JSON.stringify(updatedCartItems), {
		// 	path: "/",
		// 	maxAge: 30 * 24 * 60 * 60,
		// });
	};

	const decreaseItemQuantity = (index) => {
		const updatedCartItems = [...cartItems];
		if (updatedCartItems[index].quantity > 1) {
			updatedCartItems[index].quantity -= 1;
			setCartItems(updatedCartItems);

			setCookieHandler("cartItems", JSON.stringify(updatedCartItems));
			// setCookie(null, "cartItems", JSON.stringify(updatedCartItems), {
			// 	path: "/",
			// 	maxAge: 30 * 24 * 60 * 60,
			// });
		}
	};

	const removeItem = (index) => {
		const items = [...cartItems];
		items.splice(index, 1);
		setCartItems(items);

		setCookieHandler("cartItems", JSON.stringify(items));
		// setCookie(null, "cartItems", JSON.stringify(items), {
		// 	path: "/",
		// 	maxAge: 30 * 24 * 60 * 60,
		// });
	};

	const clearCart = () => {
		setCartItems([]);
		destroyCookie(null, "cartItems", {
			path: "/",
		});
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
