import { motion } from "framer-motion";
import Image from "next/image";

function ChefCard({ data }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			className="shadow m-2 rounded hover:shadow-md group transition"
		>
			<div className="relative h-72 md:h-96">
				<Image
					src={data?.image}
					fill
					alt={data?.name}
					className="object-cover object-top rounded-t"
				/>
			</div>
			<div className="text-left text-lg pt-5 pb-3 flex justify-between md:flex-col  space-y-3 ">
				<div className="text-center">
					<h6>{data?.name}</h6>
					<p className="text-sm">{data?.short_description}</p>
				</div>
			</div>
		</motion.div>
	);
}

export default ChefCard;
