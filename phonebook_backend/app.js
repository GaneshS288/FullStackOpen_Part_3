import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/Person.js";

morgan.token("postData", (req) => {
    if (req.method === "POST") return JSON.stringify(req.body);
    else return "";
});
const app = new express();

const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
);

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(logger);

app.get("/api/persons", async (req, res, next) => {
    try {
        let allPersons = await Person.find();
        allPersons = allPersons.map((person) => person.toJSON());
        res.json(allPersons);
    } catch (error) {
        next(error);
    }
});

app.get("/api/persons/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({});
        }
        res.json(person.toJSON());
    } catch (error) {
        next(error);
    }
});

app.post("/api/persons", async (req, res, next) => {
    const { name, number } = req.body;

    try {
        const nameExists = await Person.findOne({ name: name });

        if (!name || !number) {
            const error =
                "name or number field value is empty. Please send a request with both field values";
            return res.status(400).json({ error });
        } else if (nameExists) {
            const error = `The name ${name} already exists.`;
            return res.status(400).json({ error });
        } else {
            const entry = new Person({ name, number });
            const savedEntry = await entry.save();

            res.status(201).json(savedEntry.toJSON());
        }
    } catch (error) {
        next(error);
    }
});

app.put("/api/persons/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const person = await Person.findById(id);
        const { name, number } = req.body;

        if (!person) {
            return res.status(404).json({ error: "This entry doesn't exist" });
        } else if (!name || !number) {
            const error =
                "name or number field value is empty. Please send a request with both field values";
            return res.status(400).json({ error });
        }

        person.name = name;
        person.number = number;

        const updatedPerson = await person.save();

        res.json(updatedPerson);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/persons/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPerson = await Person.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({ error: "No such entry" });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

app.get("/info", async (req, res, next) => {
    const date = new Date().toString();

    try {
        const allPersons = await Person.find({});

        const infoText = `Phonebook has info for ${allPersons.length} people`;

        res.send(`${infoText}, Date: ${date}`);
    } catch (error) {
        next(error);
    }
});

app.use("/*splat", (req, res) => {
    res.status(404).send("This is not a valid endpoint");
});

app.use((err, req, res, next) => {
    console.error(err.message);

    if (err.name === "CastError") {
        return res.status(400).json({ error: "malformatted id" });
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    next(err);
});

app.listen(process.env.PORT, () =>
    console.log(`the server is running at port ${process.env.PORT}`)
);
