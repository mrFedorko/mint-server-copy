import { Schema, model, Types} from 'mongoose';

const noteSchema = new Schema({
    owner: {type: Types.ObjectId, ref: "User"},
    notes: [
        {
            text: {type: String},
            date: {type: Number},
            isRecent: {type: Boolean},
            deleted:Boolean,
            like: {type: Boolean}
        }
    ]
});

const Note = model('Note', noteSchema);



export default Note;
