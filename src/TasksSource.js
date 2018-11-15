const { MongoClient, ObjectId } = require('mongodb');
const { mongoURL } = require('./connectionString');

let db;
let tasksCollection;
let accountCollection;

MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    throw err;
  }

  db = client.db('Task');
  tasksCollection = db.collection('Tasks');
  accountCollection = db.collection('Accounts');
});

module.exports = {
    getAccount: async (_id) => {
        return await accountCollection.findOne({
            _id: ObjectId(_id)
        });
    },

    getTasksForUser: async (userId) => {
        return await tasksCollection.find({ userId }).toArray();
    },

    getTask: async (_id) => {
        return await tasksCollection.findOne({ 
            _id: ObjectId(_id)
        });
    },

    writeTask: async (task) => {
        const creationDate = new Date();

        const newTask = {
            title: task.title,
            bridge: task.bridge,
            reason: task.reason,
            isComplete: false,
            creationDate: creationDate,
            updateDate: creationDate,
            completionDate: null
        };

        const insertedTask = await tasksCollection.insertOne(newTask);
        return insertedTask.insertedId;
    },

    deleteTask: async (task) => {
        const deletion = await tasksCollection.deleteOne({
            _id: ObjectId(task._id)
        });

        return deletion.deletedCount;
    }
}
