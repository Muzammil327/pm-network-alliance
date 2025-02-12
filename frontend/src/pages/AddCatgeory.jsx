import CatgeoryForm from "../components/common/CatgeoryForm";

const AddCatgeory = () => {
  const handleSuccess = () => {
    window.location.href = "/dashboard/catgeory";
  };
  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Add Catgeory
        </h1>
      </div>
      <CatgeoryForm onSuccess={handleSuccess} />
    </>
  );
};

export default AddCatgeory;
