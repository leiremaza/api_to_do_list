const path = require("path");
const fs = require("fs/promises");

/**
 * Interface to attachments.json model
 */


/**
 * 
 * @param {String} pathAttachments 
 * @returns {Array<Object>}
 */
const daoRead = async (pathAttachments = "models/attachments.json") => {
    const pathToModel = path.resolve(pathAttachments);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/attachments.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readAttachments = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readAttachmentById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} attachment 
 */
const addAttachment = async (attachment) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        title: attachment.title
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteAttachment = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingAttachmentIndex = data.findIndex((d) => d.id == id);
    if (deletingAttachmentIndex > -1) {
        data.splice(deletingAttachmentIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} attachment 
 * @returns {Boolean}
 */
const editAttachment = async (id, attachment) => {
    let edited = false;
    const data = await daoRead();
    const editingAttachmentIndex = data.findIndex((d) => d.id == id);
    if (editingAttachmentIndex > -1) {
        data.splice(editingAttachmentIndex, 1, {
            ...data[editingAttachmentIndex],
            id: +id,
            title: attachment.title
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readAttachments,
    readAttachmentById,
    addAttachment,    
    deleteAttachment,
    editAttachment
};
