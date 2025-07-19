require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/allHoldings", async (req, res) => {
	const allHoldings = await HoldingsModel.find({});
	res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
	const allPositions = await PositionsModel.find({});
	res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
	const newOrder = new OrdersModel({
		name: req.body.name,
		qty: req.body.qty,
		price: req.body.price,
		mode: req.body.mode,
	});

	await newOrder.save();
	res.send("Order saved!");
});

// Server
app.listen(PORT, () => {
	console.log("✅ App started!");
	mongoose.connect(uri).then(() => console.log("✅ DB connected!")).catch(err => console.log("❌ DB error:", err));
});
