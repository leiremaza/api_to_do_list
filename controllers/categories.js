const path = require("path");
const fs = require("fs/promises");

/**
 * Interface to categories.json model
 */


/**
 * 
 * @param {String} pathCategories 
 * @returns {Array<Object>}
 */
const daoRead = async (pathCategories = "models/categories.json") => {
    const pathToModel = path.resolve(pathCategories);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/categories.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readCategories = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readCategoryById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} category 
 */
const addCategory = async (category) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        name: category.name,
        color: category.color
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteCategory = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingCategoryIndex = data.findIndex((d) => d.id == id);
    if (deletingCategoryIndex > -1) {
        data.splice(deletingCategoryIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} category 
 * @returns {Boolean}
 */
const editCategory = async (id, category) => {
    let edited = false;
    const data = await daoRead();
    const editingCategoryIndex = data.findIndex((d) => d.id == id);
    if (editingCategoryIndex > -1) {
        data.splice(editingCategoryIndex, 1, {
            ...data[editingCategoryIndex],
            id: +id,
            name: category.name,
            color: category.color
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readCategories,
    readCategoryById,
    addCategory,    
    deleteCategory,
    editCategory
};
