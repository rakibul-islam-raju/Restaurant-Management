import SectionHeader from "./SectionHeader";

const BookTable = () => {
	return (
		<section className="w-full p-2 sm:p-20 md:p-20 h-full bg-[url('/bg_3.jpg.webp')] bg-no-repeat bg-cover bg-center">
			<div className="w-full sm:w-2/3 md:w-1/2 bg-white flex flex-col justify-center p-4 pb-10 rounded-lg">
				<SectionHeader
					upperText={"Book a table"}
					lowerText={"Make Reservation"}
				/>

				<div className="w-full sm:flex md:flex ">
					<div className="w-full sm:w-1/2 md:w-1/2 mr-3 ">
						<label htmlFor="name" className="leading-7 text-sm text-gray-800">
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Your Name"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-2"
						/>

						<label htmlFor="phone" className="leading-7 text-sm text-gray-800">
							Phone
						</label>
						<input
							type="text"
							id="phone"
							placeholder="Phone"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-2"
						/>

						<label htmlFor="time" className="leading-7 text-sm text-gray-800">
							Time
						</label>
						<input
							type="time"
							id="time"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
						/>
					</div>

					<div className="w-full sm:w-1/2 md:w-1/2">
						<label htmlFor="email" className="leading-7 text-sm text-gray-800">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="Your Email"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-2"
						/>

						<label htmlFor="date" className="leading-7 text-sm text-gray-800">
							Date
						</label>
						<input
							type="date"
							id="date"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-2"
						/>

						<label htmlFor="person" className="leading-7 text-sm text-gray-800">
							Person
						</label>
						<input
							type="text"
							id="person"
							placeholder="Number of Persons"
							className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>

				<button
					type="button"
					className={`mt-8 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
				>
					Make a Reservation
				</button>
			</div>
		</section>
	);
};

export default BookTable;

{
	/* <input
  type="text"
  name="mail"
  placeholder="Enter email address"
  className=" w-full p-4 py-3 text-black text-center rounded-sm text-lg  bg-slate-200 "
  required
></input>; */
}
