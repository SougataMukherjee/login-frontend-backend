const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/yourdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/test", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
