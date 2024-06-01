import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetGenresQuery,
  useUpdateGenreMutation,
} from "../../redux/Genre/genreApi";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GenreType } from "../../types/GenreType";
import { toast } from "react-toastify";
import AreYouSure from "../../components/AreYouSure";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";

const Genres = () => {
  const { register, handleSubmit, reset } = useForm<Pick<GenreType, "name">>();
  const [selected, setSelected] = useState("");
  const [update, setUpdate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const { data: genres, isFetching: getGenres } = useGetGenresQuery();
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const onSubmit: SubmitHandler<Pick<GenreType, "name">> = async (data) => {
    try {
      await createGenre(data).unwrap();
      toast.success("Genre created successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }

    reset();
  };

  const handleDelete = async () => {
    try {
      await deleteGenre(selected).unwrap();
      toast.success("Genre deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }

    setIsModalOpen(false);
    setSelected("");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateGenre({
        _id: selected,
        name: { name: update },
      }).unwrap();
      toast.success("Genre updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }

    setIsModalEditOpen(false);
    setUpdate("");
    setSelected("");
  };

  return (
    <div className="bg-sub w-full p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center md:text-left uppercase">
        Genres Management
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
        <FloatingLabel
          variant="outlined"
          label="Create genre"
          {...register("name")}
          className="text-text"
        />
        <Button type="submit" color="failure">
          Create
        </Button>
      </form>

      {!getGenres ? (
        <section className="flex flex-wrap gap-4">
          {genres?.map((item) => (
            <div key={item._id} className="flex">
              <Button
                color="failure"
                onClick={() => {
                  setSelected(item._id);
                  setIsModalEditOpen(true);
                }}
                className="rounded-r-none capitalize"
              >
                {item.name}
              </Button>
              <Button
                color="dark"
                onClick={() => {
                  setSelected(item._id);
                  setIsModalOpen(true);
                }}
                className="rounded-l-none flex items-center justify-center"
              >
                <FaTimes />
              </Button>
            </div>
          ))}
        </section>
      ) : (
        <div className="grid place-items-center">
          <Loader size="lg" />
        </div>
      )}

      {/* Modal */}
      <Modal
        dismissible
        show={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
      >
        <Modal.Header className="bg-secondary"></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <FloatingLabel
              variant="outlined"
              label="Update name"
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
            />
            <div className="w-full flex items-center justify-between">
              <Button onClick={() => setIsModalEditOpen(false)} color="blue">
                No
              </Button>
              <Button type="submit" color="failure">
                Yes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <AreYouSure
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handler={handleDelete}
      />
    </div>
  );
};

export default Genres;
