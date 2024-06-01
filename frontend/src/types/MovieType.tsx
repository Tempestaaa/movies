import { GenreType } from "./GenreType";

export type MovieType = {
  _id: string;
  name: string;
  desc: string;
  director: string;
  language: string;
  genres: GenreType;
  trailer: string;
  duration: number;
  rating: number;
  year: number;
  image: string;
};
