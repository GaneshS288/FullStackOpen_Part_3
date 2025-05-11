import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

try {
    await mongoose.connect(url);
    console.log("successfully connected to mongodb database");
} catch (error) {
    console.log("error connecting to mongodb", error);
}

const personSchema = new mongoose.Schema({ name: String, number: String });

personSchema.set("toJSON", {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model("person", personSchema);

export default Person;

