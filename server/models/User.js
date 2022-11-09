import { Schema, model, Types } from 'mongoose';




const userSchema = new Schema({
    
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    refreshToken: {type: String, default: ''},

    settings: {
        name: {type: String, default: 'Пользователь'},
        adress: {type: String, default: ''},
        phone: {type: String, default: ''},
        entity: {type: String, default: ''},
        entityName: {type: String, default: ''},
        TIN: {type: String, default: ''},
        OGRN: {type: String, default: ''},
        check: {type: String, default: ''},
        corCheck: {type: String, default: ''},
        bank: {type: String, default: ''},
        BIK: {type: String, default: ''},

    },

    notes:{type: Array, default: [{message :'Поздравляем с регистрацией на нашем сайте! При возникновении проблем, вы можете обратиться в поддержку по общему телефону или в live-чате в разделе "Помощь"', time: Date.now()},]},

    orders: [{type: Types.ObjectId, ref: 'Order'}],
 
});

const User = model('User', userSchema);



export default User;
