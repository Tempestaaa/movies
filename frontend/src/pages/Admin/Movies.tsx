import { Button, Table, Tooltip } from "flowbite-react";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMoviesQuery } from "../../redux/Movie/movieApi";

const Movies = () => {
  const { data: movies, isFetching } = useGetMoviesQuery();

  const durationConvert = (duration: number) => {
    const hour = duration / 60;
    const minute = duration % 60;
    return hour.toFixed(0) + "h" + (minute === 0 ? "" : minute);
  };

  return (
    <div className="bg-sub w-full p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center md:text-left uppercase inline-flex">
        Movies Management
        <Tooltip
          content={`Currently having ${movies?.length} ${
            movies?.length === 1
              ? "movie"
              : movies?.length && movies?.length > 1
              ? "movies"
              : "movie"
          } in database`}
          className="text-xs normal-case"
        >
          <span className="text-lg ml-4">( {movies?.length} )</span>
        </Tooltip>
      </h1>

      <section className="overflow-auto scrollbar scrollbar-track-sub scrollbar-thumb-secondary pr-2 pb-2 flex-1">
        {movies && movies?.length > 0 && !isFetching ? (
          <Table className="table-auto overflow-auto">
            <Table.Head>
              <Table.HeadCell>image</Table.HeadCell>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>director</Table.HeadCell>
              <Table.HeadCell>genres</Table.HeadCell>
              <Table.HeadCell>duration</Table.HeadCell>
              <Table.HeadCell>year</Table.HeadCell>
              <Table.HeadCell>rating</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {movies?.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <div className="w-36 aspect-square">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="font-bold hover:underline cursor-pointer text-text">
                      {item.name}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.director}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {/* <span className="capitalize">{item.genres}</span> */}
                  </Table.Cell>
                  <Table.Cell>
                    <span>{durationConvert(item.duration)}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{item.year}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="flex items-center gap-1">
                      {item.rating}{" "}
                      <span>
                        <FaStar className="text-yellow-400" />
                      </span>
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Link to={`update-movie/${item._id}`}>
                        <Button color="warning">
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button color="failure">
                        <FaTrash />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="grid place-items-center overflow-hidden">
            <Loader size="md" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Movies;
