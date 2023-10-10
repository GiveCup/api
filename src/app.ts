import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import organizationRoutes from "./routes/organization.routes";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);

// Catch all route (Optional)
app.get("*", (req: any, res: any) => {
  res.status(404).send("Not Found");
});

export default app;
