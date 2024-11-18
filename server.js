const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());


app.get("/api/quote", async (req, res) => {
	try {
		// 名言APIにリクエストを送信
		const response = await axios.get("https://meigen.doodlenote.net/api/json.php?c=1");
		res.json(response.data); // APIからのレスポンスをReactに返す
	} catch (error) {
		console.error("Error fetching quote:", error.message);
		res.status(500).send("Error fetching quote")
	}
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});