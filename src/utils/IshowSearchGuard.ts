import { IshowSearch } from "../tvmaze-api-types";
import { IshowGuard } from "./IshowGuard";

export const IshowSearchGuard = (obj: any): obj is IshowSearch =>
  typeof obj === "object" &&
  "score" in obj &&
  "show" in obj &&
  IshowGuard(obj.show);
