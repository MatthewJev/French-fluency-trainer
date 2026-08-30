const express = require("express");
const cors = require("cors");
require ("dotenv").config();
const openAI = require("openai")
const app = express();
app.use(cors())

const PORT = 3000;

const openai = new openAI({

  apiKey: process.env.OPENAI_API_KEY

});
app.get("/generated", async (req, res) => {

  try {

    const response = await openai.responses.create({

      model: "gpt-5-mini",

      input: `Generate one simple French sentence and its English translation.
      Return ONLY valid JSON in this exact format:[{ "french": "...", "english": "..."}]`

    });

    console.log(response.output_text);

    const generated = JSON.parse(response.output_text);

    res.json(generated);

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: "OpenAI request failed" });

  }

});

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});