import { Ishow } from "../tvmaze-api-types";

export const IshowGuard = (obj: any): obj is Ishow =>
  typeof obj === "object" &&
  "id" in obj &&
  "name" in obj &&
  "genres" in obj &&
  Array.isArray(obj.genres) &&
  obj.genres.length > 0 &&
  "summary" in obj;
