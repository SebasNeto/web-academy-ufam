import express from "express";
import router from "./router/v1Router";

const app = express();

app.use(express.json());

app.use("/v1", router);

const PORT = 4455;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});