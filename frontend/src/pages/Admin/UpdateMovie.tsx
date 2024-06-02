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
  useGetMovieQuery,
  useUploadPosterMutation,
} from "../../redux/Movie/movieApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { MovieType } from "../../types/MovieType";
import { useGetGenresQuery } from "../../redux/Genre/genreApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const { data: movie } = useGetMovieQuery(id as string);
  const { data: genres } = useGetGenresQuery();
  const [cast, setCast] = useState([""]);
  const [file, setFile] = useState<File | string>();
  const [uploadPoster] = useUploadPosterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<MovieType, "_id" | "cast">>({
    mode: "all",
    values: movie,
  });

  const onSubmit: SubmitHandler<Omit<MovieType, "_id" | "cast">> = async (
    data
  ) => {
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
    }

    reset();
    setFile(undefined);
    setCast([""]);
  };

  return (
    <div className="bg-sub w-full p-4 rounded-md flex flex-col gap-4">
      <h1 className="text-4xl font-semibold text-center md:text-left uppercase">
        Update movie
      </h1>

      <article>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          data-form="create-movie"
          className="flex gap-4 flex-col md:flex-row"
        >
          <section className="w-1/3 rounded-md flex-shrink-0 overflow-hidden border-2 border-dashed border-blue-500 max-h-[560px]">
            <Label>
              <div className="w-full h-full">
                <img
                  src={movie?.image}
                  alt="Poster"
                  className="bg-sub w-full h-full p-2"
                />
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
              <TextInput
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-xs text-secondary">{errors.name.message}</p>
              )}
            </Label>
            <Label>
              Description: <span className="text-xs text-secondary">( * )</span>
              <Textarea
                rows={3}
                {...register("desc", { required: "Description is required" })}
              />
              {errors.desc && (
                <p className="text-xs text-secondary">{errors.desc.message}</p>
              )}
            </Label>
            <Label>
              Director: <span className="text-xs text-secondary">( * )</span>
              <TextInput
                {...register("director", { required: "Director is required" })}
              />
              {errors.director && (
                <p className="text-xs text-secondary">
                  {errors.director.message}
                </p>
              )}
            </Label>
            <Label>
              Cast (comma-seperate):
              <TextInput
                value={cast && cast.join(", ")}
                onChange={(e) => setCast(e.target.value.split(", "))}
              />
            </Label>
            <Label className="capitalize">
              Genre: <span className="text-xs text-secondary">( * )</span>
              <Select
                {...register("genres", { required: "Genre is required" })}
              >
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
              {errors.genres && (
                <p className="text-xs text-secondary">
                  {errors.genres.message}
                </p>
              )}
            </Label>
            <Label>
              Trailer: <span className="text-xs text-secondary">( * )</span>
              <TextInput
                {...register("trailer", { required: "Trailer is required" })}
              />
              {errors.trailer && (
                <p className="text-xs text-secondary">
                  {errors.trailer.message}
                </p>
              )}
            </Label>

            <div className="flex flex-col md:flex-row gap-4">
              <Label>
                Language: <span className="text-xs text-secondary">( * )</span>
                <TextInput
                  {...register("language", {
                    required: "Language is required",
                  })}
                />
                {errors.language && (
                  <p className="text-xs text-secondary">
                    {errors.language.message}
                  </p>
                )}
              </Label>
              <Label>
                Duration: <span className="text-xs text-secondary">( * )</span>
                <TextInput
                  type="number"
                  step="any"
                  {...register("duration", {
                    validate: (input) => {
                      if (input < 0) return "Duration can't be negative";
                      return true;
                    },
                  })}
                />
                {errors.duration && (
                  <p className="text-xs text-secondary">
                    {errors.duration.message}
                  </p>
                )}
              </Label>
              <Label>
                Year: <span className="text-xs text-secondary">( * )</span>
                <TextInput
                  type="number"
                  step="any"
                  {...register("year", {
                    validate: (input) => {
                      if (input < 0) return "Year can't be negative";
                      return true;
                    },
                  })}
                />
                {errors.year && (
                  <p className="text-xs text-secondary">
                    {errors.year.message}
                  </p>
                )}
              </Label>
              <Label>
                Rating: <span className="text-xs text-secondary">( * )</span>
                <TextInput
                  type="number"
                  step="any"
                  {...register("rating", {
                    validate: (input) => {
                      if (input < 0) return "Rating can't be negative";
                      return true;
                    },
                  })}
                />
                {errors.rating && (
                  <p className="text-xs text-secondary">
                    {errors.rating.message}
                  </p>
                )}
              </Label>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button
                onClick={() => {
                  reset();
                  setFile(undefined);
                  setCast([""]);
                }}
                color="blue"
              >
                Reset
              </Button>
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

export default UpdateMovie;
