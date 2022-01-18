const path = require("path");
const fs = require("fs/promises");
const { getEnabledCategories } = require("trace_events");

/**
 * Interface to comments.json model
 */


/**
 * 
 * @param {String} pathComments 
 * @returns {Array<Object>}
 */
const daoRead = async (pathComments = "models/comments.json") => {
    const pathToModel = path.resolve(pathComments);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/comments.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readComments = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readCommentById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} comment 
 */
const addComment = async (comment) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        text: comment.text,
        user: +comment.user
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteComment = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingCommentIndex = data.findIndex((d) => d.id == id);
    if (deletingCommentIndex > -1) {
        data.splice(deletingCommentIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} comment 
 * @returns {Boolean}
 */
const editComment = async (id, comment) => {
    let edited = false;
    const data = await daoRead();
    const editingCommentIndex = data.findIndex((d) => d.id == id);
    if (editingCommentIndex > -1) {
        data.splice(editingCommentIndex, 1, {
            ...data[editingCommentIndex],
            id: +id,
            text: comment.text,
            user: +comment.user
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readComments,
    readCommentById,
    addComment,    
    deleteComment,
    editComment
};
