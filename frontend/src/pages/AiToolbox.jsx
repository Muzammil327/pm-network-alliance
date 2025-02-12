import radialGradient from "../assets/images/png/radial_gradient_bg.png";
import GetTools from "../components/common/GetTool";

const AiToolbox = () => {
  return (
    <div className="custom_container px-4 md:px-8 lg:px-16 xl:px-24">
      <div
        data-aos="fade-down"
        className="text-center py-16 md:py-24 lg:py-32 relative"
      >
        <div className="absolute top-[75px] sm:top-0 -z-10">
          <img src={radialGradient} alt="" />
        </div>
        <div className="inline-block p-[2px] rounded-[200px] btn_animate">
          <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
            AI Toolbox
          </button>
        </div>
        <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white my-6 max-w-4xl mx-auto">
          AI Toolbox to Boost Efficiency & Automation
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">
          Boost efficiency, automate repetitive work, and make data-driven
          decisions with the right AI-powered solutions.
        </p>

        <a href="https://thepmnetworkalliance.beehiiv.com/">
          <button className="mt-6 sm:mt-8 lg:mt-[48px]  text-lg sm:text-lg font-semibold py-4 px-8 sm:py-5 sm:px-8 rounded-full  !leading-[14px] tracking-[-0.2%] join_btn">
            Join Now for Free
          </button>
        </a>
      </div>

      {/* Right tools for you */}
      <section className="md:!mt-16 mt-5">
        <div className="text-center">
          <div className="inline-block p-[2px] rounded-[200px] btn_animate">
            <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
              AI Tools
            </button>
          </div>
          <h1 className="my-4 text-3xl md:text-4xl lg:text-5xl text-white font-medium">
            Find the Right Tool for Your Needs
          </h1>
          <p className="text-[#778A8F] text-lg md:text-xl w-full max-w-lg mx-auto">
            Browse by category or use the search bar to find AI tools that fit
            your workflow.
          </p>
        </div>
        <GetTools filter="user" />
      </section>
    </div>
  );
};

export default AiToolbox;
