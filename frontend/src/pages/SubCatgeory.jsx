import GetSubCatgeory from "../components/common/GetSubCatgeory";

const SubCatgeory = () => {
  return (
    <div className="custom_container px-4 sm:px-6 lg:px-8">
      {/* courses */}
      <section>
        <div className="text-center !py-20">
          <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
            Sub Catgeory
          </h1>
        </div>

        <div className="mt-10 flex items-end justify-end md:justify-end gap-4">
          <a href="/dashboard/subcatgeory/add">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Add Sub Catgeory
              </button>
            </div>
          </a>
        </div>

        <GetSubCatgeory />
      </section>
    </div>
  );
};

export default SubCatgeory;
