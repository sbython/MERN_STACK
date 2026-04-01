
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userdata} = require("../models/user.model")
const privt_key = process.env.privt_key
const register = async (req, res) =>{
    
    if (!req.body || !req.body.email || !req.body.password)
        return res.status(400).send({error: "some of input not send!!"})

    try
    {
        const user = await userdata.findOne({email : req.body.email})  
        if (user)
            return res.status(409).send({error : "this user is exist"})
        let password = await bcrypt.hash(req.body.password, 10)
        const newuser = new userdata({
            email : req.body.email,
            username : req.body.username || "unknown",
            password: password
        })
        await newuser.save()
        const tok = await jwt.sign({userId : newuser._id}, privt_key ,{ expiresIn: '1d' });
        return res.status(201).send({message : "user created successflly", token: tok})
    }
    catch (err){
        return res.status(500).json({ error: 'Registration failed', obj: err });
    }
}

const login = async (req, res) =>{
    const {email, password} = req.body;

    if (!email || !password)
       return res.status(400).send({error: "some of input not send!!"})
    try
    {
        const user = await userdata.findOne({email});
        if (!user)
            return res.status(401).send({error: "the use or passrod is wrong"})
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).send({error : "the use or passrod is wrong"})
        const token =  await jwt.sign({userId : user._id}, privt_key ,{ expiresIn: '1d' });
        return res.status(200).send({token})
    }
    catch (err){
        return res.status(500).json({ error: 'Registration failed' , obj: err});
    }

}


const me = async  (req, res) => {
    const userId = req.userId;
    try 
    {
        const user = await userdata.findById(userId.userId);
        if(!user)
            return res.status(404).send({error: "user not found"})
        res.status(200).send({
            id : user._id,
            email: user.email,
            username : user.username,
        });

    }
    catch (err)
    {
        return res.status(500).send({ error: err });
    }
}

module.exports = {register, login , me}