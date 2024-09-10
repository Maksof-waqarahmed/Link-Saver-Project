import {Router} from 'express';
import {findAllUser, findUser, createUser, updateUser, deleteUser} from '../controller/userController'
const router = Router();

router.get('/', findAllUser);
router.get('/:id', findUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;