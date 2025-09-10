const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

require("dotenv").config();
require("./Config/connect");

app.use(express.json({ limit: "20mb" }));
app.use(cors());

const contactUserRoutes = require("./Routes/contactUser");
const userRoutes = require("./Routes/User");
const propertyRoutes = require("./Routes/Property");
const flatRoutes = require("./Routes/Flats");
const inquiryRoutes = require("./Routes/Inquiry");

app.use("/user", userRoutes);
app.use("/contact", contactUserRoutes);
app.use("/property", propertyRoutes);
app.use("/flat", flatRoutes);
app.use("/inquiry", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("Application is Working");
});

app.listen(port, () => console.log("Application is running on port : ", port));
