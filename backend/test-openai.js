import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
console.log("Testing API Key:", apiKey ? "Present" : "Missing");

if (!apiKey) {
    console.error("Error: OPENAI_API_KEY is missing in .env file");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: apiKey,
});

async function testOpenAI() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Say hello!" }],
            model: "gpt-3.5-turbo",
        });

        console.log("Success! Response:", completion.choices[0].message.content);
    } catch (error) {
        console.error("Error testing OpenAI API:");
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testOpenAI();
