const User = require('../models/User');
const bcrypt = require('bcryptjs');


module.exports = async (req, res) => {


    try {
        const { name, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12)
        const candidate = await User.findOne({ password: hashedPassword, name: name })

        if (candidate) {
            return res.json({ statusCode: 400, message: "Такой пользователь уже зарегистрирован" })
        }

        const user = new User({ name, password: hashedPassword, avatar: '', online: false })

        await user.save()

        res.json({ statusCode: 201, message: "Новый пользователь успешно зарегистрирован", user })
    } catch (e) {
        return res.json({ statusCode: 400, message: "Ошибка при регистрации" })
    }
};
