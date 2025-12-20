import AnimatedTextLines from "../ui/AnimatedTextLines";

const Hero = ({ data }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-10 lg:px-20 max-w-[1920px] mx-auto relative z-10 pointer-events-none pt-12 pb-20 md:py-20">
      <div className="pointer-events-auto mt-4 md:mt-0">
        <AnimatedTextLines 
          text={data.title} 
          className="banner-text-responsive text-darkLava mb-6 uppercase leading-[0.9] font-amiamie"
          scrub={false}
        />
        
        <div className="flex flex-col md:flex-row gap-6 md:items-start mt-8">
            <AnimatedTextLines 
                text={data.subtitle} 
                className="text-xl md:text-3xl text-sageGray font-light max-w-xl"
                delay={0.3}
                scrub={false}
            />
        </div>
        
        <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="max-w-xl">
                <h3 className="label-text-premium mb-4">Technical Focus</h3>
                <AnimatedTextLines 
                    text={data.focus} 
                    className="text-lg md:text-2xl text-darkLava leading-tight font-medium"
                    scrub={true}
                />
            </div>
            <div className="max-w-xl">
                <h3 className="label-text-premium mb-4">Approach</h3>
                <AnimatedTextLines 
                    text={data.selfDriven} 
                    className="text-base md:text-lg text-sageGray leading-relaxed body-text-premium"
                    scrub={true}
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;