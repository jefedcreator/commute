const router = require("express").Router();

const { 
    createUser,
    loginUser, 
    getUser,
    updateUser 
} = require('../controller/user/')

const{ UserAuth } = require('../middleware/index');

router.post("/signup", createUser);
router.post('/login', loginUser)

router.get('/:id', UserAuth, getUser)

router.put('/update/:id', UserAuth, updateUser)


module.exports = router;
