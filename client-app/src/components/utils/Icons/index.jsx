import Link from "next/link";

function Icons({ bg, color }) {
	return (
		<div className="text-2xl space-x-2  ">
			<Link className="" href="">
				<i
					className={`bx bxl-twitter  ${
						(bg && "icon-bg") || (color && "text-golden")
					}`}
				></i>
			</Link>
			<Link href="">
				<i
					className={`bx bxl-facebook  ${
						(bg && "icon-bg") || (color && "text-golden")
					}`}
				></i>
			</Link>
			<Link href="">
				<i
					className={`bx bxl-whatsapp  ${
						(bg && "icon-bg") || (color && "text-golden")
					}`}
				></i>
			</Link>
			<Link href="">
				<i
					className={`bx bxl-youtube  ${
						(bg && "icon-bg") || (color && "text-golden")
					}`}
				></i>
			</Link>
		</div>
	);
}

export default Icons;
