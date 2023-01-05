import { Schema, model, Types } from 'mongoose';

const reviewSchema = new Schema({
    text: {type: String},
    rate: {type: Number},
    date: {type: String},
    order: {type: String},
    img: {type: String},
    anonim: {type: Boolean},
    name: {type: String},
    owner: {type: Types.ObjectId},
    access: {type: Boolean}
});

const Review = model('Review', reviewSchema);



export default Review;
