import useSubCategoryApi from "../../api/useSubCategoryApi";
import SimpleCard from "./SimpleCard";

const GetSubCatgeory = () => {
  const { subCatgeorys, loading, deleteSubCatgeory } = useSubCategoryApi();

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {loading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          subCatgeorys &&
          subCatgeorys?.map((card) => (
            <SimpleCard
              key={card._id}
              title={card.name}
              deleteCourse={() => deleteSubCatgeory(card._id)}
              updateCourse={`/dashboard/subcatgeory/edit/${card._id}`}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GetSubCatgeory;
