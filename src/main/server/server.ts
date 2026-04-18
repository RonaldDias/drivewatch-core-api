import "dotenv/config";
import { app } from "../config/app";
import { redisClient } from "../../infra/security/rate-limiter";

const PORT = process.env.PORT || 3000;

redisClient.on("connect", () => {
  console.log("[Redis] Conectado! Proteções de Rate Limit ativadas.");
});

redisClient.on("error", (err) => {
  console.error(
    "[Redis] Erro. Verifique se o container Redis está rodando:",
    err.message,
  );
});

app.listen(PORT, () => {
  console.log(`[Core API] Protegida e rodando na porta ${PORT}`);
});
