import { faker } from "@faker-js/faker";
import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const { id, password } = req.body as { id: string; password: string };

    if (id === "user1" && password === "password1") {
      return res(
        ctx.status(200),
        ctx.json({
          status: "success",
          accessToken: "123456789!@#",
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Invalid ID or password" })
      );
    }
  }),

  rest.get("/user", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (token !== "123456789!@#") {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          username: faker.name.firstName() + faker.name.lastName(),
          userAge: faker.datatype.number({
            min: 10,
            max: 50,
          }),
          role: "user",
        })
      );
    }
  }),
];
