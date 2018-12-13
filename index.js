require('dotenv').config();

const port = parseInt(process.env.PORT, 10);

// Apollo Server
const { ApolloServer, gql } = require('apollo-server-express');
const { 
  getTasks,
  getTask,
  writeTask,
  deleteTask
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

  type DeletionResult {
    _id: String
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

    deleteTask(
      _id: String
    ): DeletionResult
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
    },
    deleteTask: async (root, args, content, info) => {
      return await deleteTask(args);
    }
  }
};

// Express
const express = require('express');
const app = express();

// Server
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
});
