import mongoose from "mongoose";

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://swamiganesh288:${password}@cluster0.crnizbv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

await mongoose.connect(url);

const personSchema = new mongoose.Schema({ name: String, number: String });

const Person = mongoose.model("person", personSchema);

if (process.argv.length === 3) {
    try {
        const res = await Person.find();
        console.log(`phonebook:`);
        res.forEach((entry) => {
            console.log(`${entry.name} ${entry.number}`);
        })
        await mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
} else if (process.argv.length === 5) {
    try {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        });
        const res = await person.save();
        console.log(`added name: ${res.name}, number: ${res.number} to the phonebook`);
        await mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}
