//Importar dependencias
import express from 'express';

//Importar middlewares
import { isUserAuthMiddleware } from '../middlewares/index.js';

//Importar funciones controladoras
import {
    newHackathonController,
    themesListController,
    listHackathonController,
} from '../controllers/hackathones/index.js';

//Crear router
const router = express.Router();

//Endpoint crear nuevo hackathon
router.post('/new', isUserAuthMiddleware, newHackathonController);

//Endpoint lista hackatones
router.get('/hackathones', isUserAuthMiddleware, listHackathonController);
//Endpoint lista temáticas hackatones
router.get('/themesList', isUserAuthMiddleware, themesListController);

export default router;
