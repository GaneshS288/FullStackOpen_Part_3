import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

try {
    await mongoose.connect(url);
    console.log("successfully connected to mongodb database");
} catch (error) {
    console.log("error connecting to mongodb", error);
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "name must be at least 3 characters long"],
        trim: true,
    },
    number: {
        type: String,
        minLength: [8, "phone number must be at least 8 number long"],
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message:
                "Invalid phone number format. the format must be like this 91-23864843",
        },
    },
});

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
