const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors())

const PORT = 3000;

app.get("/generated", (req, res) => {
    res.json([

  {

    "french": "Je vais à la maison.",

    "english": "I am going home."

  }

]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});