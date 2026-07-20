import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import router from "./router/v1Router";
import setLangCookie from "./middlewares/setLangCookie";
import swaggerSpec from "./swagger";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(setLangCookie);
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET ?? "expapi-segredo-de-desenvolvimento",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { swaggerOptions: { withCredentials: true } })
);
app.use("/v1", router);

const PORT = Number(process.env.PORT ?? 4455);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api`);
});
