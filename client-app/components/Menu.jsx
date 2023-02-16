import SectionHeader from "./SectionHeader";

const Menu = () => {
  return (
    <section className="w-full h-full flex-col justify-center mt-10">
      <SectionHeader upperText={"Specialities"} lowerText={"Our Menu"} />

      <div className="mx-4 sm:mx-6 lg:mx-20 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-3  ">
        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* below this div is single card. need to loop over it when dynamic data comes  */}
        <div className="border w-full  h-[350px] flex flex-col mr-2 mb-4 ">
          <div className="w-full h-full p-2">
            <img src="assets/img/1.jpg" alt="menu" />
          </div>

          <div className="mb-60 w-full h-full  p-2 text-slate-700 text-base">
            <div className="flex font-semibold ">
              <h1 className="w-3/4 text-slate-900 ">
                Grilled Beef with potatoes
              </h1>

              <p className="w-1/4 text-golden ">$23</p>
            </div>

            <p>Meat, Potatoes, Rice, Tomatoe</p>
            <button
              type="button"
              className={`mt-2 py-2 px-4 text-white bg-golden rounded-sm hover:text-golden hover:bg-white outline hover:outline-1 hover:duration-300`}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
