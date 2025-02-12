import SubCatgeoryForm from "../components/common/SubCatgeoryForm";

const AddSubCatgeory = () => {
  const handleSuccess = () => {
    window.location.href = "/dashboard/subcatgeory";
  };
  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Add Sub Catgeory
        </h1>
      </div>
      <SubCatgeoryForm onSuccess={handleSuccess} />
    </>
  );
};

export default AddSubCatgeory;
