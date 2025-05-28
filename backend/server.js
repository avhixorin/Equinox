const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

const newsFeed = [
    {
      id: 1,
      category: "Technology",
      time: "5 min ago",
      title: "AI System Develops New Drug Compounds in Record Time",
      views: 53,
      shares: 162,
      sources: ["NDTV", "AIM", "Physics", "Global Times"],
      image:
        "https://snworksceo.imgix.net/jhn/474bba34-4922-4ad9-b891-4356bda18438.sized-1000x1000.jpg?w=1000",
    },
    {
      id: 2,
      category: "Science",
      time: "16 min ago",
      title: "Breakthrough in Quantum Computing Achieves New Milestone",
      views: 95,
      shares: 39,
      sources: ["Physics", "AIM", "NDTV", "Global Times"],
      image: "https://gizmodo.com/app/uploads/2017/12/pvd8vmbbwiuc4topum7i.jpg",
    },
    {
      id: 3,
      category: "Science",
      time: "16 min ago",
      title: "Breakthrough in Quantum Computing Achieves New Milestone",
      views: 95,
      shares: 39,
      sources: ["Physics", "AIM", "NDTV", "Global Times"],
      image:
        "https://images.theconversation.com/files/373757/original/file-20201209-23-1teiwj4.jpg?ixlib=rb-4.1.0&rect=0%2C239%2C4451%2C2225&q=45&auto=format&w=668&h=324&fit=crop",
    },
    {
      id: 4,
      category: "Technology",
      time: "5 min ago",
      title: "AI System Develops New Drug Compounds in Record Time",
      views: 53,
      shares: 162,
      sources: ["NDTV", "AIM", "Physics", "Global Times"],
      image: "https://gizmodo.com/app/uploads/2017/12/pvd8vmbbwiuc4topum7i.jpg",
    },
    {
      id: 5,
      category: "Technology",
      time: "5 min ago",
      title: "AI System Develops New Drug Compounds in Record Time",
      views: 53,
      shares: 162,
      sources: ["NDTV", "AIM", "Physics", "Global Times"],
      image:
        "https://images.theconversation.com/files/373757/original/file-20201209-23-1teiwj4.jpg?ixlib=rb-4.1.0&rect=0%2C239%2C4451%2C2225&q=45&auto=format&w=668&h=324&fit=crop",
    },
    {
      id: 6,
      category: "Technology",
      time: "5 min ago",
      title: "AI System Develops New Drug Compounds in Record Time",
      views: 53,
      shares: 162,
      sources: ["NDTV", "AIM", "Physics", "Global Times"],
      image:
        "https://snworksceo.imgix.net/jhn/474bba34-4922-4ad9-b891-4356bda18438.sized-1000x1000.jpg?w=1000",
    },
  ];

// Schema definition
const typeDefs = gql`
  type News {
    id: ID!
    category: String!
    time: String!
    title: String!
    views: Int!
    shares: Int!
    sources: [String!]!
    image: String!
  }

  type Query {
    getInitialFeed: [News!]!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getInitialFeed: () => newsFeed,
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
