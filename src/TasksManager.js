const { 
    getTasks,
    getTask,
    writeTask 
} = require('./TasksSource');

module.exports = {
    getTasks: async () => {
        const tasks = await getTasks();
        return tasks.map(objectIdToString);
    },

    getTask: async (_id) => {
        const task = await getTask(_id);
        return objectIdToString(task);
    },

    writeTask: async (task) => {
        const newTaskId = await writeTask(task);
        const newTask = await getTask(newTaskId);
        return objectIdToString(newTask);
    }
}

const objectIdToString = (obj) => {
    obj._id = obj._id.toString();
    return obj;
}
