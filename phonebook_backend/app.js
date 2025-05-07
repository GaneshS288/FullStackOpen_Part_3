import express from "express";
import phonebook from "./db/phonebook.js";

const app = new express();

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
});

app.use("/*splat", (req, res) => {
    res.send("This is not a valid endpoint");
});

app.listen(3001, () => console.log("the server is running at port 3001"));
