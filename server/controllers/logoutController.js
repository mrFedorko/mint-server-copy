import User from '../models/User.js';

export const handleLogout = async (req, res) => {
    console.log('start logout')
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt.toString();
    console.log(refreshToken)
    
    const foundUser = await User.findOne({refreshToken});
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true}, {sameSite: false});
        console.log('uesr was not found')

        return res.sendStatus(204);
    }
    console.log(foundUser)
    await foundUser.updateOne({refreshToken: ''})
    console.log('user was upd');
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'});
    return res.sendStatus(204);
    
}