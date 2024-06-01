import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import {
  useCreateMovieMutation,
  useUploadPosterMutation,
} from "../../redux/Movie/movieApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { MovieType } from "../../types/MovieType";
import { useGetGenresQuery } from "../../redux/Genre/genreApi";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const [file, setFile] = useState<File | string>();
  const [uploadPoster] = useUploadPosterMutation();
  const [createMovie] = useCreateMovieMutation();
  const { data: genres } = useGetGenresQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<MovieType, "_id">>({
    mode: "all",
    defaultValues: {
      duration: 0,
      rating: 0,
      year: 0,
    },
  });

  const onSubmit: SubmitHandler<Omit<MovieType, "_id">> = async (data) => {
    let uploadImagePath = null;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const uploadImageResponse = await uploadPoster(formData);
      try {
        if (uploadImageResponse.data) {
          uploadImagePath = uploadImageResponse.data;
        }
      } catch (error: any) {
        return toast.error(`Failed to upload image: ${error}`);
      }

      try {
        await createMovie({
          ...data,
          image: uploadImagePath,
        }).unwrap();
        toast.success("Movie created successfully");
      } catch (error: any) {
        return console.log(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="bg-sub w-full p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center md:text-left uppercase">
        Create movie
      </h1>

      <article>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-form="create-movie"
          className="flex gap-4 flex-col md:flex-row"
        >
          <section className="w-1/3 rounded-md flex-shrink-0 overflow-hidden border-2 border-dashed border-blue-500 max-h-[550px]">
            <Label>
              <div className="w-full h-full">
                {file && (
                  <img
                    src={URL.createObjectURL(file as File)}
                    alt="Poster"
                    className="bg-sub w-full h-full p-2"
                  />
                )}
              </div>
              <FileInput
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
            </Label>
          </section>

          <section className="flex-1">
            <Label>
              Name: <span className="text-xs text-secondary">( * )</span>
              <TextInput {...register("name")} />
            </Label>
            <Label>
              Description: <span className="text-xs text-secondary">( * )</span>
              <Textarea rows={3} {...register("desc")} />
            </Label>
            <Label>
              Director: <span className="text-xs text-secondary">( * )</span>
              <TextInput {...register("director")} />
            </Label>
            <Label>
              Cast (comma-seperate):
              <TextInput />
            </Label>
            <Label className="capitalize">
              Genre: <span className="text-xs text-secondary">( * )</span>
              <Select {...register("genres")}>
                {genres &&
                  genres.map((item) => (
                    <option
                      value={item._id}
                      key={item._id}
                      className="capitalize"
                    >
                      {item.name}
                    </option>
                  ))}
              </Select>
            </Label>
            <Label>
              Trailer: <span className="text-xs text-secondary">( * )</span>
              <TextInput {...register("trailer")} />
            </Label>

            <div className="flex flex-col md:flex-row gap-4">
              <Label>
                Language: <span className="text-xs text-secondary">( * )</span>
                <TextInput {...register("language")} />
              </Label>
              <Label>
                Duration: <span className="text-xs text-secondary">( * )</span>
                <TextInput type="number" step="any" {...register("duration")} />
              </Label>
              <Label>
                Year: <span className="text-xs text-secondary">( * )</span>
                <TextInput type="number" step="any" {...register("year")} />
              </Label>
              <Label>
                Rating: <span className="text-xs text-secondary">( * )</span>
                <TextInput type="number" step="any" {...register("rating")} />
              </Label>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button color="blue">Reset</Button>
              <Button type="submit" color="failure">
                Submit
              </Button>
            </div>
          </section>
        </form>
      </article>
    </div>
  );
};

export default CreateMovie;
