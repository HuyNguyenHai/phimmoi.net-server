import {user} from "../services";

let addNewUser = async (req, res, next) => {
    let newUser = req.body.newUser;
    try {
        let response = await user.addNewUser(newUser);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({
            type: "fail",
            message: "Server Error!!!"
        });
    }
}

module.exports = {
    addNewUser: addNewUser
}