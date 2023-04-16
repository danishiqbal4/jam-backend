import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
// import cors from "cors";
import db from "./models";

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

db.sequelize.sync();

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
	res.json({ message: "Hello Jum Al Majid." });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});