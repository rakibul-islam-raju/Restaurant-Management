import SectionHeader from "@/components/SectionHeader";
import Menu from "./Menu";

function Specialities() {
	const menu = [
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
		{
			name: "Grilled Beef with potatoes",
			ingredients: "Meat, Potatoes, Rice, Tomatoes",
		},
	];

	return (
		<section className=" wrapper">
			<SectionHeader upperText={"Specialities"} lowerText={"Menu"} />
			<div className="grid grid-cols-1 md:grid-cols-2 border-2">
				{menu.slice(0, 6).map((item, i) => {
					if (i == 2 || i == 3) {
						return <Menu key={i} value={false} />;
					} else {
						return <Menu key={i} />;
					}
				})}
			</div>
		</section>
	);
}

export default Specialities;
