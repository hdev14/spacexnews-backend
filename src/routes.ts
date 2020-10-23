import { Router } from 'express'

// Validators
import UserValidator from './validators/UserValidator'

// Controllers
import UserController from './controllers/UserController'

const router = Router()

const userController = new UserController()

router.post('/users', UserValidator.create, userController.create)
router.get('/users', userController.index)
router.put('/users/:id', UserValidator.update, userController.update)
router.delete('/users/:id', userController.delete)

export default router
