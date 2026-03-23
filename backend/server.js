require("dotenv").config();

const express = require('express');
const cors = require('cors');
const cityRoutes = require("./routes/cityRoutes");

const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "EnviroDash API running"});
});

//API routes
app.use("/api",cityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});