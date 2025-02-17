//función que genera errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Importar el modelo
import selectHackathonDetailsByIdModel from '../../models/hackathones/selectDetailHackathonByIdModel.js';

const hackathonDetailController = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Obtener los hackathones por el Id
        const detallesHackathones = await selectHackathonDetailsByIdModel(id);

        res.send({
            status: 'funciona pero está vacío',
            data: {
                detallesHackathones,
            },
        });
    } catch (error) {
        const customError = generateErrorUtil(
            500,
            'Error al obtener los detalles de los hackathones',
            error
        );
        res.status(customError.status).send(customError);
    }
};

export default hackathonDetailController;
