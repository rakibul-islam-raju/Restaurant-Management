import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

function About() {
	return (
		<section className="wrapper">
			<div className="grid grid-cols-5 md:gap-8 space-y-8">
				<div className="col-span-5 md:col-span-3  ">
					<div className="flex items-center justify-center space-x-4  ">
						<div className=" relative  h-72 md:h-[450px]  md:mt-[-50px] w-full ">
							<Image
								src={"/about.jpg.webp"}
								fill
								alt=" Mr. Alex ,Main chef"
								className="object-cover object-left"
							/>
						</div>

						<div className=" relative  h-72 md:h-[450px]   w-full ">
							<Image
								src={"/about-1.jpg.webp"}
								fill
								alt=" Mr. Alex ,Helper chef"
								className="object-cover object-top"
							/>
						</div>
					</div>
				</div>
				<div className="col-span-5 md:col-span-2 text-justify  pt-12 md:pt-4 space-y-4 ">
					<SectionHeader
						upperText={"About"}
						textPosition={"text-left"}
						lowerText={"TAKE ORDER RESTRAURANT"}
						left={"left-0"}
						right={"right-0"}
						pB={"mb-0"}
						fontWeight={"font-semibold"}
					/>
					<div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
							asperiores sequi quas similique nisi maxime magni obcaecati
							maiores iste.
						</p>

						<div className="flex gap-3 items-center justify-start text-2xl text-golden font-semibold mt-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6"
							>
								<path
									fillRule="evenodd"
									d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
									clipRule="evenodd"
								/>
							</svg>

							<span className="">+880 1234567899</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
