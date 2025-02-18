//Importar dependencias
import express from 'express';

//Importar middlewares
import {
    isUserAuthMiddleware,
    hackathonRegistrationStatusMiddleware,
    isHackathonAvaliableMiddleware,
    isDevMiddleware,
} from '../middlewares/index.js';

//Importar funciones controladoras
import {
    registerHackathonController,
    confirmRegistrationHackathonController,
    cancelRegistrationController,
} from '../controllers/registrations/index.js';
//Crear router
const router = express.Router();

//Endpoint que registra a un usuario en un hackathon
router.post(
    '/:hackathonId',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    registerHackathonController
);

//Endpoint que confirma que un usuario participara en un hackathon
router.patch(
    '/:hackathonId/:confirmationCode',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    confirmRegistrationHackathonController
);

//Endpoint que cancela la inscripcion de usuario (No puede volver a inscribirse)
router.patch(
    '/:hackathonId',
    isUserAuthMiddleware,
    isDevMiddleware,
    isHackathonAvaliableMiddleware,
    hackathonRegistrationStatusMiddleware,
    cancelRegistrationController
);
export default router;
