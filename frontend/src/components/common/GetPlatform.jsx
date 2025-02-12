import usePlatformApi from "../../api/usePlatformApi";
import SimpleCard from "./SimpleCard";

const GetPlatform = () => {
  const { platforms, loading, deletePlatform } = usePlatformApi();

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {loading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          platforms &&
          platforms?.map((card) => (
            <SimpleCard
              key={card._id}
              title={card.name}
              deleteCourse={() => deletePlatform(card._id)}
              updateCourse={`/dashboard/platform/edit/${card._id}`}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GetPlatform;
