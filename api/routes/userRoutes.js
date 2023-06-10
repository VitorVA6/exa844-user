const router = require('express').Router()
const UserController = require('../controllers/UserController')
const checkToken = require('../utils/checkToken')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/update', checkToken, UserController.updateUser)
router.put('/update-pw', checkToken, UserController.updatePassword)
router.put('/admin/:id', checkToken, UserController.updatePasswordAdmin)
router.delete('/:id', checkToken, UserController.delete)
router.get('/all', checkToken, UserController.getAll)
router.get('/get-user', checkToken, UserController.getUser)

module.exports = router