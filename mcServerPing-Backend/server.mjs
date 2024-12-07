// Keith Evans

// Uses https://www.npmjs.com/package/mcping-js?activeTab=readme
// Protocol versions https://minecraft.fandom.com/wiki/Protocol_version
// Example https://www.minecraftpinger.com/?server=hypixel.net%3A25565 



import express from "express";
import cors from "cors";
import OpenAI from "openai";
import mcpingjs from "mcping-js";

const app = express();
const port = 3000;

const mcping = mcpingjs;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON request bodies

// GET endpoint for fetching a message
app.get('/api/message', (req, res) => {
    res.json({ message: "Server Connected." });
});

// POST endpoint to receive data
app.post('/api/submit', async (req, res) => {
    const { message } = req.body;
    console.log('Received Data From Client:', message); // Log the input value to the server

    const mcServerData = await getMCServerData('mc.hypixel.net', 25565);
    res.json(mcServerData);
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

///////////////// Get MC Server Data
const getMCServerData = async (ip, port) => {

    const server = new mcping.MinecraftServer(ip, port)

    return new Promise((resolve, reject) => {
        server.ping(10000, 48, (err, res) => {
            if(err) {
            return reject(err);
        }
            console.log(res);
            resolve(res);
        })
    })
}

