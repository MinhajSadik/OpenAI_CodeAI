import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: '../.env' })

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})



const openAI = new OpenAIApi(configuration)


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello from CodeAI"
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openAI.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        return res.status(200).json({
            bot: response.data.choices[0].text
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


app.listen(PORT, () => {
    console.log(`AI server started on port: ${PORT}`)
})