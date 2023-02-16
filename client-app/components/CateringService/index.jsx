import SectionHeader from 'components/SectionHeader';
import Image from 'next/image';
import React from 'react';
import ServiceCard from './ServiceCard.jsx';

function CateringService() {
  return (
    <div className='pb-32 container'>
      <section className='relative  p-4 py-32 bg-neutral-100 z-[0]'>
        <SectionHeader upperText={'Services'} lowerText={'Catering Service'} />
        <div className='grid grid-cols-1  md:grid-cols-3 gap-4'>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>
    </div>
  );
}

export default CateringService;
