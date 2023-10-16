const {decryptData} = require('./encryption');
const error = require('./globalError');

const notFound = 'Nothing found!!';
async function utilCreate(req, res, Entity, Params = {}) {
    return Entity.create(Params)
        .then((entity) => {
            return res.status(201).json({ data: entity });
        })
        .catch((err) => {
            console.log(err);
            res.status(422).json(error);
        });
}
async function utilGetOne(req, res, Entity, id) {
    await Entity.findOne({
        where: {
            id,
        },
    })
        .then((entity) => {
            if (!entity) {
                res.status(404).json(notFound);
            } else {
                const encrypted = entity.encryptedContacts;
                const decrypted = decryptData(encrypted);
                const decryptedData = JSON.parse(decrypted);
                res.status(200).json(decryptedData);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(422).json(error);
        });
}

async function utilGetAll(req, res, Entity) {
    // pagination
    let limit;
    let offset;
    let orderBy;
    let orderMethod;
    if (req.query.limit) {
        limit = req.query.limit;
    }
    // This might be rendered useless
    // Leave it till refactoring and proper testing
    else if (req.query.limit === null) {
        limit = 15;
    } else {
        limit = null;
    }

    if (req.query.page) {
        offset = 0 + (req.query.page - 1) * limit;
    } else {
        offset = 0;
    }
    if (req.query.order && req.query.orderMethod) {
        orderBy = req.query.order;
        orderMethod = req.query.orderMethod;
}
    return Entity.findAndCountAll({
        offset,
        limit,
        // order: [
        //     ['id', 'DESC']
        // ]
    })
        .then((entity) => {
            if (!entity) {
                res.status(404).json(notFound);
            }
            const decryptedDataArray = [];

            entity.rows.forEach((item) => {
                    const encrypted = item.encryptedContacts;
                    const decrypted = decryptData(encrypted);
                    const decryptedData = JSON.parse(decrypted);
                decryptedDataArray.push(decryptedData);
            });
      
            res.status(200).json({
                total: entity.count,
                per_page: parseInt(limit, 10),
                current_page: parseInt(req.query.page, 10),
                last_page: entity.count / parseInt(limit, 10),
                prev_page: parseInt(req.query.page, 10) - 1,
                next_page: parseInt(req.query.page, 10) + 1,
                from: parseInt(offset, 10) + 1,
                to: parseInt(req.query.page, 10) * limit,
                data: decryptedDataArray,
            });
        })
        .catch((err) => {
            // we shall type print out errors to the console log.
            // for production
            console.log(err);
            res.status(422).json({
                message: error,
            });
        });
}

async function utilUpdate(req, res, Entity, Params = {}, id) {
    Entity.findOne({ where: { id } }).then((entity) => {
        if (!entity) {
            res.status(404).json(notFound);
        }
        Entity.update(Params, { where: { id }, returning: true, plain: true })
            .then((updatedEntity) => {
                res.status(200).json(updatedEntity);
            })
            .catch((err) => {
                res.status(422).json(error);
                console.log(err);
            });
    });
}

async function utilDelete(req, res, Entity, id) {
    Entity.findOne({ where: { id } }).then((entity) => {
        if (!entity) {
            res.status(404).json(notFound);
        }
        Entity.destroy({ where: { id }, returning: true, plain: true })
            .then(() => {
                //res.status(200).json(`Successfully deleted the item with the id  ${id}`);
                res.status(204).json('deleted');
            })
            .catch((err) => {
                res.status(422).json(error);
                console.log(err);
            });
    });
}
module.exports = { utilGetAll, utilCreate, utilGetOne, utilUpdate, utilDelete };
