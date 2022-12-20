import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    name: {type: String},
    docType: {type: String},
    numbering: {type: String},
    fromDate: {type: String},
    link: {type: String},
});

const Document = model('Document', documentSchema);



export default Document;
