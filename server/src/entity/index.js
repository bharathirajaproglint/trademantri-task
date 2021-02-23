import mongoose from 'mongoose';
import { datastoreSchema } from './datastore';
import { templateSchema } from './template';
import { sourceConfigSchema } from './source_config';
import { companySchema } from './company';

mongoose.connect('mongodb+srv://proglint:proglint@cluster0.ouv8w.mongodb.net/trademantri', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind('connection error:', console, ));
db.once('open', function() {
  console.log('Success we are connected!')
});
const datastore = mongoose.model('datastore', datastoreSchema);
const template = mongoose.model('template', templateSchema);
const source_config = mongoose.model('source_config', sourceConfigSchema);
const company = mongoose.model('company', companySchema);

export default {
    datastore,
    template,
    source_config,
    company
};