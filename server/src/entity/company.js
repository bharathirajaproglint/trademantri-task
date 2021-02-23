import mongoose from 'mongoose';

export const companySchema = new mongoose.Schema({
    name: String
}, { strict: false });