const { ApolloError } = require('apollo-server');
const { 
    getTasks,
    getTask,
    writeTask,
    deleteTask
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
    },

    deleteTask: async (task) => {
        const deletionCount = await deleteTask(task);

        if (deletionCount !== 1) {
            throw new ApolloError('Task not deleted');
        }

        return {
            _id: task._id
        };
    }
}

const objectIdToString = (obj) => {
    obj._id = obj._id.toString();
    return obj;
}
