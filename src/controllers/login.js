const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = async (req, res) => {

    try {
        const { name, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.findOne({ name, hashedPassword })

        if (!user) {
            return res.json({ statusCode: 404, message: "Такой пользователь не существует" })
        }

        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ statusCode: 400, message: "Неверный пароль" })
        }
        res.cookie('token', hashedPassword)
        res.json({ statusCode: 200, message: "Авторизация прошла успешно", user })
    } catch (e) {
        return res.json({ statusCode: 400, message: "Ошибка при авторизации" })
    }
};
