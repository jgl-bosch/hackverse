import getPool from '../../db/getPool.js';

const filterHackathonesModel = async ({
    title,
    startingDate,
    location,
    programmingLang,
    type,
<<<<<<< HEAD
    image,
=======
>>>>>>> 0ee0556c7d56e893c980df2e0d9728984fc9a463
}) => {
    const pool = await getPool();

    let query = `
        SELECT 
            h.id, 
<<<<<<< HEAD
            h.image,
=======
>>>>>>> 0ee0556c7d56e893c980df2e0d9728984fc9a463
            h.title, 
            h.startingDate, 
            h.location,
            h.type,
            GROUP_CONCAT(p.programmingLang SEPARATOR ', ') AS programmingLangs
        FROM hackathonList h
        LEFT JOIN hackathonLangs hl ON h.id = hl.hackathonId
        LEFT JOIN programmingLangs p ON hl.programmingLangId = p.id
        WHERE 1=1
    `;

    const params = [];
<<<<<<< HEAD
    if (image) {
        query += ` AND h.image >= ?`;
        params.push(image);
    }
=======

>>>>>>> 0ee0556c7d56e893c980df2e0d9728984fc9a463
    // Filtro por título
    if (title) {
        query += ` AND LOWER(h.title) LIKE LOWER(?)`;
        params.push(`%${title.toLowerCase()}%`);
    }

    // Filtro por fecha de inicio
    if (startingDate) {
        query += ` AND h.startingDate >= ?`;
        params.push(startingDate);
    }

    // Filtro por ubicación
    if (location) {
        query += ` AND LOWER(h.location) LIKE LOWER(?)`;
        params.push(`%${location.toLowerCase()}%`);
    }

    // Filtro por tipo (online/presencial)
    if (type) {
        query += ` AND h.type = ?`;
        params.push(type);
    }

    // Filtro por lenguaje de programación
    if (programmingLang) {
        query += ` AND p.programmingLang = ?`;
        params.push(programmingLang);
    }

    // Agrupamos por hackathon para evitar duplicados
    query += ` GROUP BY h.id`;

    console.log('SQL Query:', query);
    console.log('Params:', params);

    const [hackathones] = await pool.query(query, params);
    return hackathones;
};

export default filterHackathonesModel;
