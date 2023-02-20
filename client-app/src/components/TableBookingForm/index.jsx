import SectionHeader from "@/components/SectionHeader";
import Buttton from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import Select from "@/components/utils/Select";

const TableBookingForm = () => {
	return (
		<section className=" mb-32 md:mt:32 md:bg-[url('/bg_3.jpg.webp')] md:bg-center md:bg-cover md:bg-no-repeat  md:bg-fixed">
			<form className=" container   p-4 py-16 grid grid-cols-6   ">
				<div className="relative col-span-6 md:col-span-4 bg-white z-[0] md:p-14 ">
					<SectionHeader
						upperText={"Book a table"}
						lowerText={"Make Reservation"}
					/>
					<div className="grid gap-x-6 grid-cols-1 md:grid-cols-2">
						<div className="">
							<Input
								forId={"name"}
								labelText={"Name"}
								type={"text"}
								placeholder={"Your Name"}
							/>
							<Input
								forId={"phone"}
								labelText={"Phone"}
								type={"tel"}
								placeholder={"Phone Number"}
							/>
							<Input
								forId={"time"}
								labelText={"Time"}
								type={"time"}
								placeholder={"Order Time"}
							/>
						</div>
						<div className="">
							<Input
								forId={"email"}
								labelText={"Email"}
								type={"email"}
								placeholder={"Your Email"}
							/>
							<Input
								forId={"date"}
								labelText={"Date"}
								type={"date"}
								placeholder={"Order Date"}
							/>

							<Select forId={"person"} labelText={"Person"} />
						</div>
					</div>
					<div className=" md:px-32 ">
						<Buttton width={"w-full"} text="Book Now" />
					</div>
				</div>
			</form>
		</section>
	);
};

export default TableBookingForm;
