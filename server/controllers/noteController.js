import User from "../models/User.js";

export const handleGetNotes = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user.notes){return res.status(400).json({message: 'couldnt fetch notifications', clientMessage: 'не удается загрузить уведомдления'})}
        return res.json(user.notes);
    } catch (error) {
        res.status(500).json({message: 'server side error during get settings data', clientMessage: 'Не удается загрузить уведомдления'});
    }
} 