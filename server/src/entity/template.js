import mongoose from 'mongoose';

export const templateSchema = new mongoose.Schema({
    normalizedJson: Object
}, { strict: false });