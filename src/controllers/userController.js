const userService = require("../services/userService")

const signUp = async (req, res ) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({"message" : "INVAILD_DATA_INPUT"})
    }
    await userService.signUp(email, password);
    return res.status(200).json({"message" : "SIGNUP SUCCESS"})
}

const signIn = async (req, res) => {     
    const { email, password } = req.body;
    if ( !email || !password ) {
        return res.status(404).json({"message" : "KEY ERROR"})
    } else {
        const process = await userService.signIn(email, password);
        if ( process.message == "HELLO" ) {
            res.status(201).json({"message" : "HELLO"});
        }  else {
            res.status(201).json({"message" : "WELCOME", "refreshToken" : process.refreshToken, "accessToken" : process.accessToken});
        }
    }


}

module.exports = {
    signUp,
    signIn
}