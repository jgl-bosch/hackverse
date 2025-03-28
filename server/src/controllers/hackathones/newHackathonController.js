//Importar models
import insertHackathonModel from '../../models/hackathones/insertHackathonModel.js';
import insertNewHackathonLangs from '../../models/hackathones/insertNewHackathonLangs.js';

//Importar utils
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import saveDocUtil from '../../utils/saveDocUtil.js';
import validateDatesUtil from '../../utils/validateDatesUtil.js';
import validateSchemaUtil from '../../utils/validateSchema.js';
import newHackathonSchema from '../../schemas/entries/newHackathonSchema.js';

//Funcion controlladora que crea un nuevo hackathon (solo admin)
const newHackathonController = async (req, res, next) => {
    try {
        const adminId = req.user.id;

        if (!req.body) {
            generateErrorUtil(400, 'Faltan los datos del Hackathon');
        }

        const {
            title,
            summary,
            startingDate,
            deadline,
            type,
            location = 'En todas partes',
            themeId,
            programmingLangId,
            details,
        } = req.body;

        const image = req.files?.image;
        const attachedFile = req.files?.document;

        //Si solo recibimos uno no es un array asi que no aseguramos de que lo sea
        let programmingLangIdArray = Array.isArray(req.body.programmingLangId)
            ? req.body.programmingLangId.map(Number) // Si ya es un array, se convierte a números
            : [Number(req.body.programmingLangId)]; // Si es un solo valor, se convierte en array

        req.body.programmingLangId = programmingLangIdArray;
        //Validamos con joi
        await validateSchemaUtil(newHackathonSchema, req.body);

        if (programmingLangId.length === 0) {
            generateErrorUtil(400, 'Falta el ID del lenguaje de programación');
        }

        if (programmingLangIdArray.length === 0) {
            generateErrorUtil(
                400,
                'Faltan los lenguajes de programacion (array)'
            );
        }
        //Comprobamos si las fechas son correctas
        const { formatedStartingDate, formatedDeadline } = validateDatesUtil(
            startingDate,
            deadline
        );

        //Si es presencial es obligatoria la localizacion
        if (
            type === 'presencial' &&
            (location === null || location === 'En todas partes')
        ) {
            generateErrorUtil(400, 'Faltan campo de localizacion');
        }

        //Manejo de archivos (imagenes y pdf)
        let docName = '';
        let imgName = '';
        //Si hay imagen guardamos la imagen (necesario poner el tipo)
        if (image) {
            imgName = await saveImgUtil(image, null, 'imgHack');
        }
        //Si hay un documento (solo pdf) lo guardamos
        if (attachedFile) {
            docName = await saveDocUtil(attachedFile);
        }

        const hackathonId = await insertHackathonModel({
            adminId,
            title,
            summary,
            formatedStartingDate,
            formatedDeadline,
            type,
            themeId,
            location,
            details,
            docName,
            imgName,
        });

        await insertNewHackathonLangs(hackathonId, programmingLangIdArray);

        res.status(201).send({
            status: 'ok',
            message: 'Evento hackathon creado',
            data: {
                id: hackathonId,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newHackathonController;
