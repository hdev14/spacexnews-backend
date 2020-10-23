import { Router } from 'express'

// Validators
import UserValidator from './validators/UserValidator'
import NewsValidator from './validators/NewsValidator'

// Controllers
import UserController from './controllers/UserController'
import NewsController from './controllers/NewsController'

const router = Router()

router.post('/users', UserValidator.create, UserController.create)
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.put('/users/:id', UserValidator.update, UserController.update)
router.delete('/users/:id', UserController.delete)

router.post('/news', NewsValidator.create, NewsController.create)
router.get('/news', NewsController.index)
router.put('/news/:id', NewsValidator.update, NewsController.update)
router.delete('/news/:id', NewsController.delete)

export default router
