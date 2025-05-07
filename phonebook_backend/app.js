import express from "express";
import phonebook from "./db/phonebook.js";

const app = new express();

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = phonebook.find((person) => person.id === id);
    if(!person) {
        return res.status(404).json({});
    }
    res.json(person);
});

app.get("/info", (req, res) => {
    const date = new Date().toString();
    const infoText = `Phonebook has info for ${phonebook.length} people`;

    res.send(`<div>
        <p>${infoText}</p>
        <p>${date}</p>
    </div>`);
});

app.use("/*splat", (req, res) => {
    res.status(404).send("This is not a valid endpoint");
});

app.listen(3001, () => console.log("the server is running at port 3001"));
