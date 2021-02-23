import mongoose from 'mongoose';

export const sourceConfigSchema = new mongoose.Schema({
    normalizedJson: Object,
    companyId: String
}, { strict: false });