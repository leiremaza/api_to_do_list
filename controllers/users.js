const path = require("path");
const fs = require("fs/promises");

/**
 * Interface to users.json model
 */


/**
 * 
 * @param {String} pathUsers 
 * @returns {Array<Object>}
 */
const daoRead = async (pathUsers = "models/users.json") => {
    const pathToModel = path.resolve(pathUsers);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/users.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readUsers = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readUserById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} user 
 */
const addUser = async (user) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        name: user.name,
        pic: user.pic,
        is_master: user.is_master
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteUser = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingUserIndex = data.findIndex((d) => d.id == id);
    if (deletingUserIndex > -1) {
        data.splice(deletingUserIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} user 
 * @returns {Boolean}
 */
const editUser = async (id, user) => {
    let edited = false;
    const data = await daoRead();
    const editingUserIndex = data.findIndex((d) => d.id == id);
    if (editingUserIndex > -1) {
        data.splice(editingUserIndex, 1, {
            ...data[editingUserIndex],
            id: +id,
            name: user.name,
            pic: user.pic,
            is_master: user.is_master
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readUsers,
    readUserById,
    addUser,    
    deleteUser,
    editUser
};
