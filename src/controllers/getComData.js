const User = require('../models/User');
const getComList = require('../utils/getComList');


module.exports = async (req, res) => {
     console.log('Cookies: ', req.query.params)

    try {
        const allUsers = await User.find({ _id: { $ne: req.query.params } })
        const myData = await User.findOne({ _id: req.query.params })
        if (!allUsers.length) {
            return res.status(400).json({ statusCode: 400, message: "Вы единственный пользователь" })
        }

        let comList = await getComList({ myData })

        res.status(200).json({ statusCode: 200, message: "Все доступные пользователи", data: { allUsers, comList } })
    } catch (e) {
        return res.status(400).json({ message: "Ошибка при поиске пользователей" })
    }
};
