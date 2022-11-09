import { Schema, model} from 'mongoose';

const chatMessageSchema = new Schema({
    text: {type: String},
    expDate: {type: String},
    source: {type: String},
});

const ChatMessage = model('ChatMessage', chatMessageSchema);



export default ChatMessage;
