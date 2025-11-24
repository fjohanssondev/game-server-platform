export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL!,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
