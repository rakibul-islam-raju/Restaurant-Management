import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

export default function Auth() {
	const [tabState, setTabState] = useState("login");

	const setRegisterTab = () => {
		console.log("ok");
		setTabState("login");
	};

	return (
		<>
			<div className="w-full flex justify-evenly border rounded">
				{["login", "register"].map((item) => (
					<div className="w-full text-center">
						<div
							className={`${
								tabState === item.toLowerCase()
									? "bg-golden text-white"
									: "bg-white text-golden"
							} uppercase py-2 rounded cursor-pointer transition`}
							onClick={() => setTabState(item.toLowerCase())}
						>
							{item}
						</div>
					</div>
				))}
			</div>

			<div className="">
				{tabState === "login" ? (
					<Login />
				) : (
					<Registration setRegisterTab={setRegisterTab} />
				)}
			</div>
		</>
	);
}
