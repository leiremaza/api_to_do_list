const path = require("path");
const fs = require("fs/promises");

/**
 * Interface to tasks.json model
 */


/**
 * 
 * @param {String} pathTasks 
 * @returns {Array<Object>}
 */
const daoRead = async (pathTasks = "models/tasks.json") => {
    const pathToModel = path.resolve(pathTasks);
    const data = await fs.readFile(pathToModel);
    const dataAsJson = JSON.parse(data);
    return dataAsJson;
};

/**
 * 
 * @param {Array<Object>} data 
 */
const daoWrite = async (data) => {
    const pathToModel = path.resolve("models/tasks.json");
    const dataAsString = JSON.stringify(data, null, 2);
    await fs.writeFile(pathToModel, dataAsString);
};

/**
 * 
 * @returns {Array<Object>}
 */
const readTasks = async () => {
    const data = await daoRead();
    return data;
};

/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
const readTaskById = async (id) => {
    const data = await daoRead();
    const dataItem = data.find((d) => d.id == id);
    return dataItem;
};

/**
 * 
 * @param {Object} task 
 */
const addTask = async (task) => {
    const data = await daoRead();
    const dataLastIndex =
        data
            .map((d) => d.id)
            .sort()
            .reverse()[0] + 1;
    data.push({
        id: +dataLastIndex,
        title: task.title,
        description: task.description,
        creationDate: new Date(),
        users: task.users,
        categories: task.categories,
        attachments: task.attachments,
        comments: task.comments,
        pic: task.pic,
        section: +task.section
    });
    await daoWrite(data);
};

/**
 * 
 * @param {Number} id 
 * @returns {Boolean}
 */
const deleteTask = async (id) => {
    let deleted = false;
    const data = await daoRead();
    const deletingTaskIndex = data.findIndex((d) => d.id == id);
    if (deletingTaskIndex > -1) {
        data.splice(deletingTaskIndex, 1);
        deleted = true;
        await daoWrite(data);
    }
    return deleted;
};

/**
 * 
 * @param {Number} id 
 * @param {Object} task 
 * @returns {Boolean}
 */
const editTask = async (id, task) => {
    let edited = false;
    const data = await daoRead();
    const editingTaskIndex = data.findIndex((d) => d.id == id);
    if (editingTaskIndex > -1) {
        data.splice(editingTaskIndex, 1, {
            ...data[editingTaskIndex],
            id: +id,
            title: task.title,
            description: task.description,
            creationDate: data[editingTaskIndex].creationDate,
            users: task.users,
            categories: task.categories,
            attachments: task.attachments,
            comments: task.comments,
            pic: task.pic,
            section: +task.section
        });
        edited = true;
        await daoWrite(data);
    }
    return edited;
};

module.exports = {
    daoRead,
    daoWrite,
    readTasks,
    readTaskById,
    addTask,    
    deleteTask,
    editTask
};
