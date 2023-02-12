import FeaturedMenus from './FeatureMenus';

const Feature = () => {
  return (
    <section className='flex items-center justify-between flex-col md:flex-row  md:border-t-[1px] border-gray-700 md:absolute bottom-0 left-0 right-0 m-5'>
      <FeaturedMenus />
      <FeaturedMenus />
      <FeaturedMenus />
      <FeaturedMenus />
    </section>
  );
};

export default Feature;
