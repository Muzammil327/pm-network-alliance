import useCategoryApi from "../../api/useCategoryApi";
import SimpleCard from "./SimpleCard";

const GetCatgeory = () => {
  const { catgeorys, loading, deleteCatgeory } = useCategoryApi();

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {loading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          catgeorys &&
          catgeorys?.map((card) => (
            <SimpleCard
              key={card._id}
              title={card.name}
              deleteCourse={() => deleteCatgeory(card._id)}
              updateCourse={`/dashboard/catgeory/edit/${card._id}`}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GetCatgeory;
