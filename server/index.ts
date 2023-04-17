import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
// import cors from "cors";
import db from "./models";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import sequelize from './models/sequelize';

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and Resync Db');
// 	initial();
// });

sequelize.sync();

const initial = () => {
	Role.create({
		id: 1,
		name: "user"
	});

	Role.create({
		id: 2,
		name: "admin"
	});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello Juma Al Majid." });
});

authRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});