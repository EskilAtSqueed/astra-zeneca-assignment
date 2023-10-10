import { IshowGuard } from "../utils";

describe("IshowGuard", () => {
  it("Success", () => {
    const result = IshowGuard({
      id: 0,
      name: "Title",
      genres: ["Drama"],
      summary: "lorem ipsum",
      image: "url",
    });

    expect(result).toBe(true);
  });

  it("Genres not an array", () => {
    const result = IshowGuard({
      id: 0,
      name: "Title",
      genres: "",
      summary: "lorem ipsum",
      image: "url",
    });

    expect(result).toBe(false);
  });

  it("Genres empty array", () => {
    const result = IshowGuard({
      id: 0,
      name: "Title",
      genres: [],
      summary: "lorem ipsum",
      image: "url",
    });

    expect(result).toBe(false);
  });

  it("Missing id", () => {
    const result = IshowGuard({
      name: "Title",
      genres: ["Drama"],
      summary: "lorem ipsum",
      image: "url",
    });

    expect(result).toBe(false);
  });
});
