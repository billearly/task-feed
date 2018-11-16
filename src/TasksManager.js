const { ApolloError } = require('apollo-server');
const { 
    getAccount,
    getTasksForUser,
    getTask,
    writeTask,
    deleteTask
} = require('./TasksSource');

module.exports = {
    getAccount: async (_id) => {
        if (!_id) {
            throw new ApolloError('ID not specified');
        }

        const account = await getAccount(_id);

        if (!account) {
            throw new ApolloError(`No account found for ID ${_id}`);
        }

        return account;
    },

    getTasksForUser: async (userId) => {
        if (!userId) {
            throw new ApolloError('User not specified');
        }

        const tasks = await getTasksForUser(userId.toString());
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
