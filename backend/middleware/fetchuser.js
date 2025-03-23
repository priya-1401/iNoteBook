const jwt=require('jsonwebtoken');
const JWT_SECRET="hi this is jwt"
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid user"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user; 
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid user"})
    }
}
module.exports=fetchuser;