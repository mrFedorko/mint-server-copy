import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    text: {type: String},
    rate: {type: String},
    expDate: {type: String},
    order: {type: String},
    link: {type: String},
});

const Review = model('Review', reviewSchema);



export default Review;
