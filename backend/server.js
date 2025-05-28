const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

const newsFeed = [
  {
    id: "1",
    category: "Technology",
    time: "2025-05-28T10:30:00Z",
    title: "OpenAI Unveils GPT-5 With Real-Time Video Generation",
    views: "13240",
    shares: "980",
    image:
      "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "TechCrunch",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png",
        url: "https://techcrunch.com/openai-gpt5-release",
        newsHeadline: "OpenAI Drops GPT-5 Bombshell",
        shortDescription:
          "GPT-5 introduces real-time video generation, shaking the AI world.",
        content:
          "OpenAI’s latest model, GPT-5, now includes the ability to generate video in real time. This breakthrough is expected to revolutionize content creation, education, and virtual interaction.",
      },
    ],
  },
  {
    id: "2",
    category: "Politics",
    time: "2025-05-27T08:15:00Z",
    title: "Global Climate Accord Signed by 190 Nations",
    views: "8450",
    shares: "760",
    image:
      "https://images.unsplash.com/photo-1520452112805-c6692c840af0?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "BBC News",
        icon: "hhttps://logos-world.net/wp-content/uploads/2022/01/BBC-Emblem.png",
        url: "https://bbc.com/news/climate-accord",
        newsHeadline: "Nations Unite on Climate Policy",
        shortDescription: "190 nations come together in historic climate pact.",
        content:
          "In a rare show of unity, world leaders have agreed on a comprehensive climate policy that aims to reduce global emissions by 60% by 2040.",
      },
    ],
  },
  {
    id: "3",
    category: "Science",
    time: "2025-05-29T12:00:00Z",
    title: "Scientists Create Synthetic Black Hole in Lab",
    views: "5740",
    shares: "412",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "Scientific American",
        icon: "https://w7.pngwing.com/pngs/458/725/png-transparent-clearbit-black-logo-tech-companies.png",
        url: "https://scientificamerican.com/synthetic-black-hole",
        newsHeadline: "Black Hole Simulated on Earth",
        shortDescription:
          "Researchers simulate gravitational effects of black hole in a lab.",
        content:
          "Using laser interferometry and particle simulation, a team recreated the event horizon and measured time dilation around a synthetic black hole.",
      },
    ],
  },
  {
    id: "4",
    category: "Entertainment",
    time: "2025-05-25T14:45:00Z",
    title: "Dune: Part Three Confirmed with Surprise Lead",
    views: "15670",
    shares: "1150",
    image:
      "https://images.unsplash.com/photo-1567593810070-7a3d471af022?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "Variety",
        icon: "https://w7.pngwing.com/pngs/458/725/png-transparent-clearbit-black-logo-tech-companies.png",
        url: "https://variety.com/dune-part-three",
        newsHeadline: "Zendaya to Direct 'Dune: Part Three'",
        shortDescription:
          "Zendaya will co-direct the third installment of the Dune franchise.",
        content:
          "Warner Bros. confirmed Dune: Part Three with a surprising twist — Zendaya will take the director's chair alongside Denis Villeneuve.",
      },
    ],
  },
  {
    id: "5",
    category: "Finance",
    time: "2025-05-26T09:30:00Z",
    title: "Bitcoin Surges to $100K Amid Global Inflation",
    views: "20480",
    shares: "2005",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "CNBC",
        icon: "https://e7.pngegg.com/pngimages/310/9/png-clipart-cnbc-logo-of-nbc-television-others-miscellaneous-television.png",
        url: "https://cnbc.com/bitcoin-100k",
        newsHeadline: "Crypto Skyrockets",
        shortDescription:
          "Bitcoin crosses $100K as investors flee traditional markets.",
        content:
          "Market uncertainty and inflation have driven investors to Bitcoin, causing a historic price surge to over $100,000 per coin.",
      },
    ],
  },
  {
    id: "6",
    category: "Health",
    time: "2025-05-29T06:00:00Z",
    title: "New mRNA Vaccine Found to Reverse Autoimmune Diseases",
    views: "9875",
    shares: "875",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "Nature",
        icon: "https://static.vecteezy.com/system/resources/thumbnails/016/471/443/small/mountain-black-and-white-logo-design-nature-landscape-adventure-vector.jpg",
        url: "https://nature.com/articles/new-mrna-breakthrough",
        newsHeadline: "Autoimmunity Reversed by New Therapy",
        shortDescription:
          "Breakthrough mRNA therapy reverses symptoms in autoimmune patients.",
        content:
          "In a major medical leap, researchers have developed an mRNA-based treatment that actively reverses autoimmune conditions in early trials.",
      },
    ],
  },
  {
    id: "7",
    category: "Sports",
    time: "2025-05-28T20:10:00Z",
    title: "India Wins T20 World Cup in Super Over Thriller",
    views: "30500",
    shares: "5090",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "ESPN",
        icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg",
        url: "https://espncricinfo.com/t20-worldcup-final",
        newsHeadline: "India Triumphs in Epic Final",
        shortDescription:
          "India secures World Cup win in nail-biting super over.",
        content:
          "In a heart-stopping final match against Australia, India clinched the T20 World Cup title after a dramatic super over finish.",
      },
    ],
  },
  {
    id: "8",
    category: "World",
    time: "2025-05-24T13:00:00Z",
    title: "Mars Colony Begins First Full Rotation With Humans",
    views: "6780",
    shares: "643",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "Reuters",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Reuters_Logo.svg/1280px-Reuters_Logo.svg.png",
        url: "https://reuters.com/news/mars-colony-first-year",
        newsHeadline: "Mars Mission Hits Milestone",
        shortDescription:
          "First Martian colony completes full rotation cycle with humans.",
        content:
          "Elon Musk’s Martian vision reaches a new milestone as SpaceX's Mars One base completes its first full Martian year with 12 residents.",
      },
    ],
  },
  {
    id: "9",
    category: "Education",
    time: "2025-05-29T07:20:00Z",
    title: "IITs Launch Free Global AI Course With Certifications",
    views: "21100",
    shares: "1320",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sources: [
      {
        name: "The Hindu",
        icon: "https://www.vhv.rs/dpng/d/493-4935300_the-hindu-newspaper-logo-png-logo-of-the.png",
        url: "https://thehindu.com/iits-ai-initiative",
        newsHeadline: "India Offers Free AI Training",
        shortDescription:
          "Top Indian institutes launch global AI education initiative.",
        content:
          "A consortium of IITs has announced a global online AI program, free for all, including verified certifications and mentorship from top professors.",
      },
    ],
  },
];

// Schema definition
const typeDefs = gql`
  type Source {
    name: String!
    icon: String!
    url: String!
    newsHeadline: String!
    shortDescription: String!
    content: String!
  }

  type News {
    id: ID!
    category: String!
    time: String!
    title: String!
    views: Int!
    shares: Int!
    sources: [Source!]!
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
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
