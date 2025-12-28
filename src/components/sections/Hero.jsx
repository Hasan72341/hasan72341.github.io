import SmoothReveal from "../ui/SmoothReveal";

const Hero = ({ data }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-10 lg:px-20 max-w-[1920px] mx-auto relative z-10 pointer-events-none pt-12 pb-20 md:py-20">
      <div className="pointer-events-auto mt-4 md:mt-0 relative">
        <SmoothReveal>
          <h1 className="banner-text-responsive text-darkLava mb-6 uppercase leading-[0.9] font-amiamie">
            {data.title}
          </h1>
        </SmoothReveal>

        <div className="flex flex-col md:flex-row gap-6 md:items-start mt-8">
          <SmoothReveal delay={0.2}>
            <p className="text-xl md:text-3xl text-darkLava font-medium max-w-xl">
              {data.subtitle}
            </p>
          </SmoothReveal>
        </div>

        <div className="mt-16 md:mt-32 w-full border-t border-darkLava/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="max-w-xl">
              <SmoothReveal delay={0.1}>
                <h3 className="label-text-premium mb-4">Technical Focus</h3>
                <p className="text-lg md:text-xl text-darkLava leading-relaxed font-satoshi font-medium">
                  {data.focus}
                </p>
              </SmoothReveal>
            </div>
            <div className="max-w-xl">
              <SmoothReveal delay={0.2}>
                <h3 className="label-text-premium mb-4">Approach</h3>
                <p className="text-lg md:text-xl text-darkLava leading-relaxed font-satoshi font-medium">
                  {data.selfDriven}
                </p>
              </SmoothReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;