import mongoose from 'mongoose';

export const datastoreSchema = new mongoose.Schema({
    name: String,
    age: Number,
    location: String
}, { strict: false });