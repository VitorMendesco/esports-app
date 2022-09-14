import express from "express";
const app = express();
app.get("/ads", (req, res) => {
    console.log("access");
    return res.json([
        { id: 1, name: "ale1" },
        { id: 2, name: "ale2" },
        { id: 3, name: "ale3" },
    ]);
});
app.listen(3333);
