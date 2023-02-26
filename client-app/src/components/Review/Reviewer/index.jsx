import Star from "@/components/Star";
import Image from "next/image";
import Rating from "react-rating";
import profilePic from "../../../assets/images/profile-picture.jpeg";

export default function Reviewer({ data }) {
	return (
		<div className="m-2 p-3 shadow rounded group hover:shadow-md transition">
			<Image
				src={profilePic}
				height={99}
				width={99}
				className="rounded-full ring-4 ring-golden  mx-auto "
			/>

			<div className="mt-6">
				<div className="flex justify-center mb-2">
					<Rating
						start={0}
						stop={5}
						initialRating={data?.rating}
						readonly
						emptySymbol={<Star />}
						fullSymbol={<Star fill />}
					/>
				</div>
				<pre className="text-center mb-2">{data?.comment}</pre>
				<div className="flex gap-2">
					<span className="font-semibold">Menu:</span>{" "}
					<span>{data?.menu?.name}</span>
				</div>
				<div className="flex gap-2">
					<span className="font-semibold">Category:</span>{" "}
					<span>{data?.menu?.category?.name}</span>
				</div>
				<h6 className="text-lg text-right text-gray-500 mt-2">
					- {data?.user.first_name} {data?.user.last_name}
				</h6>
			</div>
		</div>
	);
}
