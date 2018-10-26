const { ApolloServer, gql } = require('apollo-server');
const { 
  getTasks,
  getTask,
  writeTask
} = require('./src/TasksManager');

const typeDefs = gql`
  type Task {
    _id: ID
    title: String
    bridge: String
    reason: String
    isComplete: Boolean
    creationDate: String
    updateDate: String
    completionDate: String
  }

  type Query {
    tasks: [Task]
    task(_id: String): Task
  }

  type Mutation {
    writeTask(
      title: String
      bridge: String
      reason: String
    ): Task
  }
`;

const resolvers = {
  Query: {
    tasks: async () => {
      return await getTasks();
    },
    task: async (root, { _id }) => {
      return await getTask(_id);
    },
  },

  Mutation: {
    writeTask: async (root, args, context, info) => {
      return await writeTask(args);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
