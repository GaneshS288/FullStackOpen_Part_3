import express from "express";

let phonebook = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];


const app = new express();

app.get("/api/persons", (req, res) => {
    res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    const person = phonebook.find((person) => person.id === id);
    if (!person) {
        return res.status(404).json({});
    }
    res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
    const { id } = req.params;
    phonebook = phonebook.filter((person) => person.id !== id);

    res.status(204).end();
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
