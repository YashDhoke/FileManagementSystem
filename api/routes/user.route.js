import express from 'express' ; 

const router = express.Router() ; 

export default router ; 

router.get('/test' , (req , res) => {
    res.json({
        message : 'Hello World',
    });
});