const { MongoClient, ObjectId } = require('mongodb');
const { mongoUrl } = require('./mongoConfig');

let db;
let tasksCollection;

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    throw err;
  }

  db = client.db('Task');
  tasksCollection = db.collection('Tasks');
});

module.exports = {
    getTasks: async () => {
        // connect, get the data, then close?
        // look into mongoose
        return await tasksCollection.find({}).toArray();
    },

    getTask: async (_id) => {
        return await tasksCollection.findOne({ 
            _id: ObjectId(_id)
        });
    },

    writeTask: async (task) => {
        const insertedTask = await tasksCollection.insertOne(task);
        return insertedTask.insertedId;
    }
}
