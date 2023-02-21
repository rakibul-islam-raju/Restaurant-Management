import Image from "next/image";

export default function Loader() {
	return (
		<div className="relative w-[250px] h-full">
			<Image
				className="object-cover object-center md:object-center"
				fill
				src={"loading.svg"}
				alt="Loading..."
			/>
		</div>
	);
}
