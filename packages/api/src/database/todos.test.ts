import { Context, setup, teardown } from "../../test/testContext";
import { createDatabase, Database } from "./index";

describe("Todos collection tests", () => {
  let context: Context;
  let database: Database;
  beforeEach(async () => {
    context = await setup();
    database = createDatabase(context.mysql);
  });
  afterEach(async () => {
    await teardown(context);
  });
  it("Should create a Todo", async () => {
    const id = await database.todos.create({
      title: "Title",
      description: "Description",
      userId: "UserId",
    });
    expect(id).toEqual(1);
    await expect(database.todos.getById("UserId")(id)).resolves.toMatchObject({
      title: "Title",
      description: "Description",
      id: 1,
    });
    await expect(database.todos.getAll("UserId")).resolves.toMatchObject([
      {
        title: "Title",
        description: "Description",
        id: 1,
      },
    ]);
  });
});
