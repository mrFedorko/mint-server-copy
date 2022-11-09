import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const handleNewUser = async (req, res) => {
    try {
        const errs = validationResult(req);
            if(!errs.isEmpty()){
                return res.status(400).json({
                    errs: errs.array(),
                    message: 'input data not valid',
                    clientMsg: 'Некорректные данные',
                });
            }
        const {email, password, name} = req.body;
        if (!email || !password || !name) {
            return res.status(400)
            .json({
                message: 'enter all required data',
                clientMessage: 'Не все данные введены',
            })
        }
        const candidate = await User.findOne({email});
        if(candidate) return res.status(409)
        .json({
            message: 'user with such email has already existed',
            clientMessage: 'Такой пользователь уже существует',
        });

        const hashedPassword = await bcrypt.hash(password, 6);
        const newUser = new User({email, settings: {name}, password: hashedPassword})
        newUser.save();
        res.status(201)
        .json({
            message: 'user was created', 
            clientMessage: 'Аккаунт создан',
        });

    } catch (error) {
        res.status(500)
        .json({
            message: 'server side error', 
            clientMessage: 'Ошибка сервера',
        });
    }
}


