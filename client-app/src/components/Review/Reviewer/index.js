import Star from "@/components/Star";
import Image from "next/image";
import Rating from "react-rating";
import profilePic from "../../../assets/images/profile-picture.jpeg";

export default function Reviewer({ data }) {
	return (
		<div className="pb-14 flex flex-col items-center py-4 space-y-8 rounded-2xl   ">
			<Image
				src={profilePic}
				height={99}
				width={99}
				className="rounded-full ring-4 ring-golden  mx-auto "
			/>

			<div className="text-center space-y-2">
				<pre className=" text-center">{data?.comment}</pre>
				<h6 className="text-lg">
					{data?.user.first_name} {data?.user.last_name}
				</h6>
				<p className="text-xs font-semibold uppercase leading-loose">
					<Rating
						start={0}
						stop={5}
						initialRating={data?.rating}
						readonly
						emptySymbol={<Star />}
						fullSymbol={<Star fill />}
					/>
				</p>
			</div>
		</div>
	);
}
