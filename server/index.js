import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import axios from 'axios';
import { config } from 'dotenv';
config(); // Load .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const HF_API_TOKEN = process.env.HUGGINGFACE_API_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate-suggestions', async (req, res) => {
  const { weatherData } = req.body;
  console.log("Received Weather Data:", weatherData);

  try {
          const prompt = `You are a weather assistant. Based on the weather data below, suggest 3 to 5 practical, helpful tips for a person. Weather Data:
          ${JSON.stringify(weatherData, null, 2)} and city name: ${weatherData.name} Instructions:
      - Suggestions should be in plain English.
      - Consider temperature, weather condition, wind, and humidity.
      - Suggest clothing, items to carry, and lifestyle tips.
      - Suggest about the places to visit based on the weather according to city name.
      - Respond only with a JSON array of strings.`;

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
      
    const aiContent = chat.choices[0].message.content;
    console.log("AI Raw Content:", aiContent);

    try {
      const suggestions = JSON.parse(aiContent);
      res.json({ suggestions });
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      res.status(500).json({
        error: "AI response was not valid JSON",
        raw: aiContent
      });
    }

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate suggestions" });
  }
});




// app.post('/generate-suggestions', async (req, res) => {
//   const { weatherData } = req.body;

//   const prompt = `
// You are a helpful weather assistant. Based on this data, provide 3 to 5 helpful suggestions.

// Weather:
// City: ${weatherData.name}
// Temperature: ${weatherData.main?.temp}°C
// Condition: ${weatherData.weather?.[0]?.description}
// Humidity: ${weatherData.main?.humidity}%
// Wind Speed: ${weatherData.wind?.speed} m/s

// Suggestions:
// `;

//   try {
//     const response = await axios.post(
//     'https://api-inference.huggingface.co/models/tiiuae/gpt2', 
//      { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//         },
//       }
//     );
//     console.log(response.data);


//     const text = response.data[0]?.generated_text || "No suggestions generated.";
//     const suggestions = text.split('\n').filter(Boolean).map(s => s.trim());
//     res.json({ suggestions });
//   } catch (error) {
//     console.error("Hugging Face API Error:", error?.response?.data || error.message);
//     res.status(500).json({ error: "Failed to get response from Hugging Face API" });
//   }
// });














// app.post('/generate-suggestions', async (req, res) => {
//   const { weatherData } = req.body;
//   console.log("Mock request received with weatherData:", weatherData?.name || weatherData?.city);

//   // Simulated AI-generated suggestions (mocked)
//   const mockSuggestions = [
//     "Wear light cotton clothes due to warm weather.",
//     "Carry a water bottle to stay hydrated.",
//     "Use sunscreen if going out in the sun.",
//     "Avoid outdoor activities during peak heat hours.",
//     `Visit nearby indoor attractions in ${weatherData?.name || "your city"}.`
//   ];

//   res.json({ suggestions: mockSuggestions });
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
