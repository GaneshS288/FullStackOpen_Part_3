import express from "express";
import morgan from "morgan";

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

morgan.token("postData", (req, res) => {
    if (req.method === "POST") return JSON.stringify(req.body);
    else return "";
});
const app = new express();
const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
);

app.use(express.json());
app.use(logger);

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

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body;
    const nameExists = name
        ? phonebook.some(
              (entry) => name.trim().toLowerCase() === entry.name.toLowerCase()
          )
        : false;
    if (!name || !number) {
        const message =
            "name or number field value is empty. Please send a request with both field values";
        return res.status(400).json({ message });
    } else if (nameExists) {
        const message = `The name ${name} already exists.`;
        return res.status(400).json({ message });
    } else {
        const id = Math.ceil(Math.random() * 10000).toString();
        const entry = { id, name, number };

        phonebook.push({ id, name, number });

        res.status(201).json(entry);
    }
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
