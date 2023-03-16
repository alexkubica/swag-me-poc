import dotenv from 'dotenv';
import express, { json, Request, Response, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '../dist/routes';
dotenv.config();

const SERVER_PORT = process.env.PORT ?? 3000;

const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("../dist/swagger.json"))
  );
});

app.listen(SERVER_PORT, () => {
  console.log("Express server started on port: " + SERVER_PORT);
});
