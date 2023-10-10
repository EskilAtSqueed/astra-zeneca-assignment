import { IshowGuard, apiFetch } from "../utils";

describe("apiFetch", () => {
  it("Return ok response", async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve<Response>(
        new Response(
          JSON.stringify({
            id: 0,
            name: "Title",
            genres: ["Drama"],
            summary: "lorem ipsum",
            image: "url",
          })
        )
      )
    );
    jest.spyOn(global, "fetch").mockImplementation(fetchMock);

    const result = await apiFetch("url", IshowGuard);

    expect(result).toStrictEqual(
      expect.objectContaining({
        id: 0,
        name: "Title",
        genres: expect.arrayContaining(["Drama"]),
        summary: "lorem ipsum",
        image: "url",
      })
    );
  });

  it("Guard fail", async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve<Response>(
        new Response(
          JSON.stringify({
            id: 0,
            name: "Title",
            summary: "lorem ipsum",
            image: "url",
          })
        )
      )
    );
    jest.spyOn(global, "fetch").mockImplementation(fetchMock);

    let err;
    try {
      await apiFetch("url", IshowGuard);
    } catch (error) {
      err = error;
    }

    expect(err instanceof Error).toBe(true);
    expect(err).toMatchObject(new Error("Parsing faild"));
  });
});
