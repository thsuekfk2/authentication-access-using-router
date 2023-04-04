import { faker } from "@faker-js/faker";
import { rest } from "msw";

const userData = [
  {
    id: "user",
    password: "password",
    role: "user",
  },
  {
    id: "admin",
    password: "password",
    role: "admin",
  },
];
export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const { id, password } = req.body as { id: string; password: string };
    const user = userData.find(
      (data) => data.id === id && data.password === password
    );

    if (user) {
      if (user.role == "user") {
        return res(
          ctx.status(200),
          ctx.json({
            status: "success",
            accessToken: "123456789!@#user",
          })
        );
      } else {
        return res(
          ctx.status(200),
          ctx.json({
            status: "success",
            accessToken: "123456789!@#admin",
          })
        );
      }
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Invalid ID or password" })
      );
    }
  }),

  rest.get("/user", (req, res, ctx) => {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (token == "123456789!@#user") {
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
    } else if (token == "123456789!@#admin") {
      return res(
        ctx.status(200),
        ctx.json({
          username: faker.name.firstName() + faker.name.lastName(),
          userAge: faker.datatype.number({
            min: 10,
            max: 50,
          }),
          role: "admin",
        })
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
    }
  }),

  rest.post("/logout", (req, res, ctx) => {
    sessionStorage.removeItem("accessToken");
    return res(ctx.status(204));
  }),
];
