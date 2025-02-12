import PlatformForm from "../components/common/PlatformForm";

const AddPlatform = () => {
  const handleSuccess = () => {    
    window.location.href = "/dashboard/platform";
  };
  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Add Platform
        </h1>
      </div>

      <PlatformForm onSuccess={handleSuccess} />
    </>
  );
};

export default AddPlatform;
