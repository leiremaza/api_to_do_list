const path = require("path");
const fs = require("fs/promises");

/**
 * Interface to sections.json model
 */


/**
 * 
 * @param {String} pathSections 
 * @returns {Array<Object>}
 */
const daoRead = async (pathSections = "models/sections.json") => {
    const pathToModel = path.resolve(pathSections);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/sections.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readSections = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readSectionById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} section 
 */
const addSection = async (section) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        title: section.title,
        category: section.category
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteSection = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingSectionIndex = data.findIndex((d) => d.id == id);
    if (deletingSectionIndex > -1) {
        data.splice(deletingSectionIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} section 
 * @returns {Boolean}
 */
const editSection = async (id, section) => {
    let edited = false;
    const data = await daoRead();
    const editingSectionIndex = data.findIndex((d) => d.id == id);
    if (editingSectionIndex > -1) {
        data.splice(editingSectionIndex, 1, {
            ...data[editingSectionIndex],
            id: +id,
            title: section.title,
            category: section.category
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readSections,
    readSectionById,
    addSection,    
    deleteSection,
    editSection
};
