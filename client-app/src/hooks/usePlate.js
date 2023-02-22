import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";

const usePlate = () => {
	const [plate, setPlate] = useState([]);

	const addToPlate = (item, quantity = 1) => {
		const plateCopy = [...plate];
		const itemExists = plate.find((i) => i.id === item.id);
		if (itemExists) {
			const updatedItem = { ...itemExists };
			updatedItem.quantity = updatedItem.quantity + quantity;
			const updatedPlate = plateCopy.filter((p) => p.id !== itemExists.id);
			setPlate([...updatedPlate, updatedItem]);
		} else {
			plateCopy.push({ ...item, quantity });
			setPlate(plateCopy);
		}
	};

	useEffect(() => {
		const { plate } = parseCookies(null, "palte");
		if (plate) {
			const plateItems = JSON.parse(plate);
			setPlate(plateItems);
		}
	}, []);

	useEffect(() => {
		if (plate?.length > 0) {
			const palateData = JSON.stringify(plate);
			setCookie(null, "plate", palateData);
		}
	}, [plate]);

	return [plate, addToPlate];
};

export default usePlate;
