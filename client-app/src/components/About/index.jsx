import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

function About() {
	return (
		<section className="relative wrapper ">
			<div className="grid grid-cols-5 md:gap-8 space-y-8">
				<div className="col-span-5 md:col-span-3  ">
					<div className="flex items-center justify-center space-x-4  ">
						{/* <div
              className=' bg-center bg-cover bg-no-repeat  md:mt-[-50px]  h-96 w-full '
              style={{ backgroundImage: `url(${'/about.jpg.webp'})` }}
            ></div> */}
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
				<div className=" col-span-5 md:col-span-2 text-justify  pt-12 md:pt-4 space-y-4 ">
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
						<h3>+8801842403974</h3>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
