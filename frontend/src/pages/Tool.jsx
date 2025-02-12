import GetTools from "../components/common/GetTool";

const Course = () => {
  return (
    <div className="custom_container px-4 sm:px-6 lg:px-8">
      {/* courses */}
      <section>
        <div className="text-center !py-20">
          <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
            Tools
          </h1>
          <p className="text-[#778A8F] font-normal text-sm sm:text-lg md:text-xl leading-6 sm:leading-7">
            AI Tools to Boost Efficiency & Automation
          </p>
        </div>

        <div className="mt-10 flex items-end justify-end md:justify-end gap-4">
          <a href="/dashboard/tools/add">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Add Tools
              </button>
            </div>
          </a>
          <a href="/dashboard/catgeory/add">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Add Catgeory
              </button>
            </div>
          </a>
          <a href="/dashboard/subcatgeory/add">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Add Sub Catgeory
              </button>
            </div>
          </a>
        </div>

        <GetTools filter="admin" />
      </section>
    </div>
  );
};

export default Course;
