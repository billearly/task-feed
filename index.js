const port = parseInt(process.env.PORT, 10) || 4000;

const { ApolloServer, gql } = require('apollo-server');
const { 
  getAccount,
  getTasksForUser,
  getTask,
  writeTask,
  deleteTask
} = require('./src/TasksManager');

const typeDefs = gql`
  type Account {
    _id: ID,
    email: String,
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    bridge: String
    reason: String
    isComplete: Boolean
    creationDate: String
    updateDate: String
    completionDate: String
    userId: String
  }

  type DeletionResult {
    _id: String
  }

  type Query {
    tasks(userId: String): [Task]
    task(_id: String): Task
    account(_id: String): Account
  }

  type Mutation {
    writeTask(
      title: String
      bridge: String
      reason: String
    ): Task

    deleteTask(
      _id: String
    ): DeletionResult
  }
`;

const resolvers = {
  Query: {
    tasks: async (root, { userId }) => {
      return await getTasksForUser(userId);
    },
    task: async (root, { _id }) => {
      return await getTask(_id);
    },
    account: async (root, { _id }) => {
      return await getAccount(_id);
    }
  },

  Mutation: {
    writeTask: async (root, args, context, info) => {
      return await writeTask(args);
    },
    deleteTask: async (root, args, content, info) => {
      return await deleteTask(args);
    }
  },

  Account: {
    async tasks(account) {
      return await getTasksForUser(account._id);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
