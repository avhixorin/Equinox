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
        id: "1",
        name: "TechCrunch",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png",
        url: "https://techcrunch.com/openai-gpt5-release",
        newsHeadline: "OpenAI Drops GPT-5 Bombshell",
        shortDescription:
          "GPT-5 introduces real-time video generation, shaking the AI world.",
        content:
          "OpenAI’s latest model, GPT-5, now includes the ability to generate video in real time. This breakthrough is expected to revolutionize content creation, education, and virtual interaction.",
      },
      {
        id: "2",
        name: "Voiceflow",
        icon: "https://www.voiceflow.com/favicon.ico",
        url: "https://www.voiceflow.com/blog/gpt-5",
        newsHeadline: "GPT-5: What We Already Know and What To Expect",
        shortDescription:
          "GPT-5 is expected to have enhanced capabilities in understanding and processing natural language, making interactions even more intuitive and human-like.",
        content:
          "GPT-5 is anticipated to feature improved natural language processing, expanded context windows, and enhanced multimodal capabilities, including better integration of text, images, audio, and video.",
      },
      {
        id: "3",
        name: "Botpress",
        icon: "https://botpress.com/favicon.ico",
        url: "https://botpress.com/blog/everything-you-should-know-about-gpt-5",
        newsHeadline: "Everything you should know about GPT-5",
        shortDescription:
          "GPT-5 is OpenAI's next-generation AI model, building on the GPT architecture while integrating improvements from reasoning models like o1 and o3.",
        content:
          "GPT-5 is OpenAI’s next-generation AI model, building on the GPT architecture while integrating improvements from reasoning models like o1 and o3. Some of these advancements are already visible in GPT-4.5, giving us a preview of what’s to come.",
      },
      {
        id: "4",
        name: "TechCrunch",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png",
        url: "https://techcrunch.com/2025/02/28/openai-plans-to-bring-soras-video-generator-to-chatgpt/",
        newsHeadline: "OpenAI plans to bring Sora's video generator to ChatGPT",
        shortDescription:
          "OpenAI intends to eventually integrate its AI video generation tool, Sora, directly into its popular consumer chatbot app, ChatGPT.",
        content:
          "OpenAI intends to eventually integrate its AI video generation tool, Sora, directly into its popular consumer chatbot app, ChatGPT, company leaders said during a Friday office hours session on Discord.",
      },
      {
        id: "5",
        name: "The Verge",
        icon: "https://www.theverge.com/favicon.ico",
        url: "https://www.theverge.com/2024/12/9/24317092/openai-sora-text-to-video-ai-launch",
        newsHeadline: "OpenAI has finally released Sora",
        shortDescription:
          "OpenAI has launched Sora, a text-to-video AI model, as part of its 'ship-mas' product release series.",
        content:
          "OpenAI has launched Sora, a text-to-video AI model, as part of its 'ship-mas' product release series. Sora allows users to generate, animate, and remix videos using text prompts and is available to ChatGPT subscribers in the US and other countries.",
      },
      {
        id: "6",
        name: "AP News",
        icon: "https://apnews.com/favicon.ico",
        url: "https://apnews.com/article/214d578d048f39c9c7b327f870dc6df8",
        newsHeadline: "OpenAI releases Sora but limits how it depicts people",
        shortDescription:
          "OpenAI has released Sora, an artificial intelligence video generator, as part of its premium ChatGPT package.",
        content:
          "OpenAI has released Sora, an artificial intelligence video generator, as part of its premium ChatGPT package. While users can create high-quality videos such as sumo-wrestling bears or a cat sipping coffee, restrictions have been placed on depicting humans to prevent misuse and deepfake concerns.",
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
        id: "1",
        name: "BBC News",
        icon: "hhttps://logos-world.net/wp-content/uploads/2022/01/BBC-Emblem.png",
        url: "https://bbc.com/news/climate-accord",
        newsHeadline: "Nations Unite on Climate Policy",
        shortDescription: "190 nations come together in historic climate pact.",
        content:
          "In a rare show of unity, world leaders have agreed on a comprehensive climate policy that aims to reduce global emissions by 60% by 2040.",
      },
      {
        id: "2",
        name: "UNFCCC",
        icon: "https://unfccc.int/sites/default/files/unfccc_logo.png",
        url: "https://unfccc.int/process-and-meetings/the-paris-agreement",
        newsHeadline: "Global Accord to Limit Warming Below 2°C",
        shortDescription:
          "196 countries unite under the Paris Agreement to combat climate change.",
        content:
          "Adopted in 2015, the Paris Agreement brings nations together to limit global warming to well below 2°C, aiming for 1.5°C. It mandates countries to submit and update their emission reduction plans every five years, fostering a collective effort against climate change.",
      },
      {
        id: "3",
        name: "European Commission",
        icon: "https://ec.europa.eu/info/sites/default/files/eu-commission-logo.png",
        url: "https://climate.ec.europa.eu/eu-action/climate-strategies-targets/2040-climate-target_en",
        newsHeadline: "EU Proposes 90% Emissions Reduction by 2040",
        shortDescription:
          "European Commission sets ambitious target to cut greenhouse gases.",
        content:
          "In February 2024, the European Commission recommended a 90% net reduction in greenhouse gas emissions by 2040 compared to 1990 levels. This aligns with the EU's broader goal of reaching climate neutrality by 2050.",
      },
      {
        id: "4",
        name: "The Climate Pledge",
        icon: "https://www.theclimatepledge.com/etc.clientlibs/theclimatepledge/clientlibs/clientlib-site/resources/images/logo.svg",
        url: "https://www.theclimatepledge.com/",
        newsHeadline: "Companies Commit to Net-Zero Carbon by 2040",
        shortDescription:
          "Global businesses unite for accelerated climate action.",
        content:
          "The Climate Pledge is a commitment by companies to reach net-zero carbon emissions by 2040. Signatories agree to regular reporting, carbon elimination, and credible offsets to combat climate change.",
      },
      {
        id: "5",
        name: "Associated Press",
        icon: "https://apnews.com/images/AP-logo.png",
        url: "https://apnews.com/article/64c0e39e6ad54a98e05e5201a2215293",
        newsHeadline: "UN Climate Talks Agree to Transition from Fossil Fuels",
        shortDescription:
          "COP28 ends with deal to shift away from fossil fuels.",
        content:
          "During the COP28 summit in Dubai, nearly 200 countries agreed to transition away from fossil fuels. The deal emphasizes renewable energy and limiting global warming to 1.5°C.",
      },
      {
        id: "6",
        name: "Le Monde",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/32/Le_Monde_logo.svg",
        url: "https://www.lemonde.fr/en/environment/article/2024/04/30/g7-nations-pledge-to-close-all-coal-plants-by-2035_6186629_114.html",
        newsHeadline: "G7 Nations Pledge to Close Coal Plants by 2035",
        shortDescription:
          "Major economies plan full coal phase-out within a decade.",
        content:
          "At the recent G7 summit, member countries agreed to shut down all unabated coal power plants by 2035. This move is seen as critical to meeting global climate targets.",
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
        id: "1",
        name: "Scientific American",
        icon: "https://w7.pngwing.com/pngs/458/725/png-transparent-clearbit-black-logo-tech-companies.png",
        url: "https://scientificamerican.com/synthetic-black-hole",
        newsHeadline: "Black Hole Simulated on Earth",
        shortDescription:
          "Researchers simulate gravitational effects of black hole in a lab.",
        content:
          "Using laser interferometry and particle simulation, a team recreated the event horizon and measured time dilation around a synthetic black hole.",
      },
      {
        id: "2",
        name: "Wired",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wired_logo.svg",
        url: "https://www.wired.com/story/a-scientists-tiny-black-hole-brings-the-cosmos-into-the-lab",
        newsHeadline:
          "A Scientist's Tiny Black Hole Brings the Cosmos Into the Lab",
        shortDescription:
          "Jeff Steinhauer creates microscopic black holes using Bose-Einstein condensates.",
        content:
          "Israeli physicist Jeff Steinhauer has created microscopic black holes in his lab using 8,000 rubidium atoms cooled into a Bose-Einstein condensate. These tiny event horizons trap sound waves, mimicking the light-trapping effect of real black holes.",
      },
      {
        id: "3",
        name: "The Sun",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Sun_logo.svg",
        url: "https://www.thesun.co.uk/tech/30017511/black-hole-simulation-stars-spaghetti-matter/",
        newsHeadline:
          "Horrifying Black Hole Simulation Shows What 'Spaghettification' Looks Like",
        shortDescription:
          "New animation illustrates how black holes stretch stars into long strands.",
        content:
          "A new simulation from astrophysicists demonstrates 'spaghettification'—the extreme stretching of objects by black hole gravity. The study shows how stars are pulled apart, with only a small percentage of their matter being consumed by the black hole.",
      },
      {
        id: "4",
        name: "Times of India",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/The_Times_of_India_Logo.svg",
        url: "https://timesofindia.indiatimes.com/science/what-is-the-black-hole-bomb-theory-and-how-scientists-brought-it-to-life-in-the-lab/articleshow/120939001.cms",
        newsHeadline:
          "Physicists Create 'Black Hole Bomb' for First Time on Earth",
        shortDescription:
          "Scientists simulate energy amplification from rotating black holes in the lab.",
        content:
          "Physicists from Europe and Italy created a black hole bomb in a lab—an experiment simulating energy amplification through superradiance. It validates a 1972 theory using a rotating cylinder and surrounding coils to extract energy in a manner similar to black holes.",
      },
      {
        id: "5",
        name: "Earth.com",
        icon: "https://www.earth.com/static/images/logo.png",
        url: "https://www.earth.com/news/quantum-vortex-created-lab-mimic-black-hole-behavior/",
        newsHeadline:
          "Quantum Vortex Created in the Lab to Mimic Black Hole Behavior",
        shortDescription:
          "Researchers use superfluid helium to simulate black hole dynamics.",
        content:
          "A team at the University of Nottingham created a quantum vortex with superfluid helium to study surface waves in a controlled environment. This simulates how black holes influence spacetime and offers new insight into quantum field interactions near event horizons.",
      },
      {
        id: "6",
        name: "MIT Technology Review",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/0d/MIT_Technology_Review_logo.svg",
        url: "https://www.technologyreview.com/2009/10/14/265245/artificial-black-hole-created-in-chinese-lab/",
        newsHeadline: "Artificial Black Hole Created in Chinese Lab",
        shortDescription:
          "Physicists develop metamaterial that traps microwaves, simulating a black hole.",
        content:
          "Chinese researchers built a microwave-absorbing metamaterial consisting of concentric circuit layers. It distorts electromagnetic fields to trap energy, simulating how a black hole absorbs light—paving the way for breakthroughs in wave absorption technologies.",
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
        id: "1",
        name: "Variety",
        icon: "https://w7.pngwing.com/pngs/458/725/png-transparent-clearbit-black-logo-tech-companies.png",
        url: "https://variety.com/dune-part-three",
        newsHeadline: "Zendaya to Direct 'Dune: Part Three'",
        shortDescription:
          "Zendaya will co-direct the third installment of the Dune franchise.",
        content:
          "Warner Bros. confirmed Dune: Part Three with a surprising twist — Zendaya will take the director's chair alongside Denis Villeneuve.",
      },
      {
        id: "2",
        name: "Entertainment Weekly",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Entertainment_Weekly_logo.svg",
        url: "https://ew.com/denis-villeneuve-s-third-dune-movie-is-officially-happening-8608521",
        newsHeadline:
          "Denis Villeneuve's third 'Dune' movie is officially in the works",
        shortDescription:
          "Legendary confirms development of a third Dune film with Villeneuve at the helm.",
        content:
          "Legendary has confirmed the development of a third movie in the Dune franchise, based on Frank Herbert's novels. Director Denis Villeneuve expressed his desire to adapt 'Dune Messiah', continuing Paul Atreides' story with new intergalactic factions and characters introduced in the second part.",
      },
      {
        id: "3",
        name: "Hindustan Times",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Hindustan_Times_Logo.svg",
        url: "https://www.hindustantimes.com/entertainment/hollywood/zendaya-confirms-her-dune-3-return-but-this-reason-is-holding-her-back-101706332347346.html",
        newsHeadline:
          "Zendaya confirms her Dune 3 return but THIS reason is holding her back",
        shortDescription:
          "Zendaya eager to reprise her role as Chani in Dune 3, awaiting director's vision.",
        content:
          "Zendaya has expressed her eagerness to return as Chani in the upcoming Dune sequel. However, she emphasizes her commitment to director Denis Villeneuve's vision, stating that she's waiting for his direction to ensure the story's integrity.",
      },
      {
        id: "4",
        name: "Digital Spy",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Digital_Spy_Logo.svg",
        url: "https://www.digitalspy.com/movies/a46969001/dune-3-messiah/",
        newsHeadline: "Dune 3 release date, cast and more (updated April 2025)",
        shortDescription:
          "Dune 3 set for December 2026 release with returning cast.",
        content:
          "Dune 3 is scheduled for release on December 18, 2026. The film is expected to continue the saga with returning actors, including Timothée Chalamet and Zendaya, under Denis Villeneuve's direction.",
      },
      {
        id: "5",
        name: "Screen Rant",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Screen_Rant_Logo.svg",
        url: "https://screenrant.com/dune-3-possible-title-director-plans-everything-we-know/",
        newsHeadline:
          "Dune: Part Three - Confirmation, Cast & Everything We Know",
        shortDescription:
          "Villeneuve plans to adapt 'Dune Messiah' with returning cast.",
        content:
          "Director Denis Villeneuve is set to adapt 'Dune Messiah' for the third installment of the Dune series. The film will likely see the return of Timothée Chalamet as Paul Atreides and Zendaya as Chani, continuing the epic saga on Arrakis.",
      },
      {
        id: "6",
        name: "Parade",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Parade_Logo.svg",
        url: "https://parade.com/movies/dune-part-three",
        newsHeadline:
          "Will Zendaya and Timothée Chalamet Return for 'Dune: Part Three'?",
        shortDescription:
          "Villeneuve developing Dune: Part Three with expected returning cast.",
        content:
          "Denis Villeneuve is developing the third installment of the Dune franchise, with expectations of Timothée Chalamet and Zendaya reprising their roles. The film aims to continue the narrative based on Frank Herbert's 'Dune Messiah'.",
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
        id: "1",
        name: "CNBC",
        icon: "https://e7.pngegg.com/pngimages/310/9/png-clipart-cnbc-logo-of-nbc-television-others-miscellaneous-television.png",
        url: "https://cnbc.com/bitcoin-100k",
        newsHeadline: "Crypto Skyrockets",
        shortDescription:
          "Bitcoin crosses $100K as investors flee traditional markets.",
        content:
          "Market uncertainty and inflation have driven investors to Bitcoin, causing a historic price surge to over $100,000 per coin.",
      },
      {
        id: "2",
        name: "CoinDesk",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/CoinDesk_Logo.svg",
        url: "https://www.coindesk.com/markets/2025/05/02/bitcoin-tops-usd100k-for-first-time-in-3-months-are-upside-targets-too-low",
        newsHeadline: "Bitcoin Tops $100K for First Time in 3 Months",
        shortDescription: "Bitcoin surges past $100K amid market optimism.",
        content:
          "Bitcoin is back above $100,000 after dropping just under $75,000 following President Trump's early April tariff announcements. Traditional markets have joined crypto in rallying following the initial panic over the tariff news.",
      },
      {
        id: "3",
        name: "Investopedia",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Investopedia_Logo.svg",
        url: "https://www.investopedia.com/watch-these-bitcoin-price-levels-as-usd100k-back-in-sight-crypto-11726871",
        newsHeadline: "Bitcoin Nears $100K",
        shortDescription: "BTC approaches $100K after bullish breakout.",
        content:
          "Bitcoin has surged to its highest point since February and is back within reach of the psychological $100,000 level. The digital asset rallied after reports surfaced that investment bank Morgan Stanley is looking into adding spot cryptocurrency trading to its E*Trade platform.",
      },
      {
        id: "4",
        name: "PYMNTS",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/PYMNTS_Logo.svg",
        url: "https://www.pymnts.com/blockchain/bitcoin/2025/bitcoin-surpasses-100k-mark-amid-new-trade-deal",
        newsHeadline: "Bitcoin Surpasses $100K Amid New Trade Deal",
        shortDescription: "BTC climbs past $100K following trade agreement.",
        content:
          "Bitcoin rose beyond $100,000 for the first time in three months, driven by anticipation for a relaxation of global tariff-related tensions following a new trade deal.",
      },
      {
        id: "5",
        name: "Cointelegraph",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Cointelegraph_Logo.svg",
        url: "https://cointelegraph.com/news/bitcoin-hits-100k-first-time-since-january",
        newsHeadline: "Bitcoin Reclaims $100K",
        shortDescription: "BTC hits $100K for the first time since January.",
        content:
          "Bitcoin reclaimed the $100,000 mark on May 8 at 3:22 pm UTC, surging 4.2% from the intraday low of $95,967, according to data from CoinGecko.",
      },
      {
        id: "6",
        name: "BBC News",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/BBC_News_Logo.svg",
        url: "https://www.bbc.com/news/articles/cqjz04lv5q9o",
        newsHeadline: "Bitcoin Crosses $100K Threshold",
        shortDescription:
          "BTC surpasses $100K, raising questions about future growth.",
        content:
          "Bitcoin's price has blasted through the much-anticipated threshold of $100,000, raising questions about how much higher it could go - and whether it can shake off its notorious volatility.",
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
        id: "1",
        name: "Nature",
        icon: "https://static.vecteezy.com/system/resources/thumbnails/016/471/443/small/mountain-black-and-white-logo-design-nature-landscape-adventure-vector.jpg",
        url: "https://nature.com/articles/new-mrna-breakthrough",
        newsHeadline: "Autoimmunity Reversed by New Therapy",
        shortDescription:
          "Breakthrough mRNA therapy reverses symptoms in autoimmune patients.",
        content:
          "In a major medical leap, researchers have developed an mRNA-based treatment that actively reverses autoimmune conditions in early trials.",
      },
      {
        id: "2",
        name: "Nature Medicine",
        icon: "https://www.nature.com/favicon.ico",
        url: "https://www.nature.com/articles/d41591-024-00024-2",
        newsHeadline: "‘Inverse vaccines’ could treat autoimmune disease",
        shortDescription:
          "Inverse vaccines retrain the immune system to tolerate self-antigens.",
        content:
          "Nature Medicine explores the latest translational and clinical research news, with clinical trials testing glycosylated autoantigens as immunotolerance therapies.",
      },
      {
        id: "3",
        name: "New York Post",
        icon: "https://nypost.com/favicon.ico",
        url: "https://nypost.com/2025/05/15/health/inverse-vaccines-could-be-holy-grail-for-treating-autoimmune-diseases/",
        newsHeadline:
          "Doctors are calling 'inverse vaccines' the 'holy grail' for fighting diseases like MS and celiac",
        shortDescription:
          "Inverse vaccines offer new hope for autoimmune disease treatment.",
        content:
          "A groundbreaking treatment known as 'inverse vaccines' offers new hope for those with autoimmune diseases such as multiple sclerosis (MS), celiac disease, and lupus. Unlike traditional treatments that suppress the entire immune system, inverse vaccines target and retrain specific parts of the immune response to reduce autoimmune attacks while leaving the rest of the system intact.",
      },
      {
        id: "4",
        name: "Nature Reviews Immunology",
        icon: "https://www.nature.com/favicon.ico",
        url: "https://www.nature.com/articles/s41577-023-00792-9",
        newsHeadline: "mRNA vaccine shows promise in autoimmunity",
        shortDescription:
          "mRNA vaccines may induce immune tolerance in autoimmune diseases.",
        content:
          "A study demonstrates that mRNA vaccines can be engineered to promote immune tolerance, offering a novel approach to treating autoimmune conditions without broad immunosuppression.",
      },
      {
        id: "5",
        name: "Nature Biotechnology",
        icon: "https://www.nature.com/favicon.ico",
        url: "https://www.nature.com/articles/s41587-022-01491-z",
        newsHeadline: "Unlocking the promise of mRNA therapeutics",
        shortDescription:
          "Advancements in mRNA technology pave the way for autoimmune disease treatments.",
        content:
          "The judicious integration of recent advances may unlock the promise of biologically targeted mRNA therapeutics, beyond vaccines and other immunostimulatory agents, for the treatment of diverse clinical indications.",
      },
      {
        id: "6",
        name: "Wikipedia",
        icon: "https://en.wikipedia.org/favicon.ico",
        url: "https://en.wikipedia.org/wiki/Inverse_vaccine",
        newsHeadline: "Inverse vaccine",
        shortDescription:
          "An overview of inverse vaccines and their potential applications.",
        content:
          "An inverse vaccine, or reverse vaccine, is a hypothetical approach to the use of vaccines that trains the immune system to not respond to certain substances. Under laboratory conditions, an inverse vaccine has been shown to combat autoimmune diseases.",
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
        id: "1",
        name: "ESPN",
        icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg",
        url: "https://espncricinfo.com/t20-worldcup-final",
        newsHeadline: "India Triumphs in Epic Final",
        shortDescription:
          "India secures World Cup win in nail-biting super over.",
        content:
          "In a heart-stopping final match against Australia, India clinched the T20 World Cup title after a dramatic super over finish.",
      },
      {
        id: "2",
        name: "Hindustan Times",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Hindustan_Times_Logo.svg",
        url: "https://www.hindustantimes.com/cricket/india-win-t20-world-cup-after-hardik-bumrah-create-magic-in-death-overs-in-nail-biter-against-south-africa-101719683142383.html",
        newsHeadline:
          "India win T20 World Cup after Hardik, Bumrah create magic in death overs in nail-biter against South Africa",
        shortDescription:
          "India clinches T20 World Cup title with a seven-run victory over South Africa.",
        content:
          "India defeated South Africa by seven runs in a nail-biting final at the Kensington Oval in Barbados on Saturday to be crowned the T20 champions of the world.",
      },
      {
        id: "3",
        name: "Sky Sports",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sky_Sports_logo_2020.svg",
        url: "https://www.skysports.com/cricket/news/12123/13160873/india-beat-south-africa-to-win-t20-world-cup-after-suryakumar-yadavs-stunning-catch",
        newsHeadline:
          "India beat South Africa to win T20 World Cup after Suryakumar Yadav's stunning catch",
        shortDescription:
          "India edges South Africa to win their second T20 World Cup title.",
        content:
          "India edged South Africa to win their second T20 World Cup title and first since 2007 as an astounding catch from Suryakumar Yadav and excellent death bowling clinched a nerve-shredding seven-run victory in Barbados.",
      },
      {
        id: "4",
        name: "Reuters",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Reuters_Logo.svg",
        url: "https://www.reuters.com/sports/cricket/india-elect-bat-t20-world-cup-final-v-south-africa-2024-06-29/",
        newsHeadline:
          "India clinches T20 World Cup title with thrilling win over South Africa",
        shortDescription:
          "India defeats South Africa by seven runs in a heart-stopping final.",
        content:
          "India clinched the Twenty20 World Cup title by defeating South Africa by seven runs in a thrilling final, marking their first global title in 11 years. This victory was significant as the tournament, co-hosted by the United States and West Indies, featured a record 20 teams.",
      },
      {
        id: "5",
        name: "BBC News",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/BBC_News_Logo.svg",
        url: "https://www.bbc.com/news/articles/cqjz04lv5q9o",
        newsHeadline:
          "India wins T20 World Cup in dramatic final against South Africa",
        shortDescription:
          "India secures T20 World Cup title with a seven-run victory.",
        content:
          "India's national cricket team secured their second Twenty20 World Cup title with a dramatic seven-run win over South Africa on Saturday, the result still in doubt at the start of the final over of an electrifying match.",
      },
      {
        id: "6",
        name: "The Guardian",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Guardian_Logo.svg",
        url: "https://www.theguardian.com/sport/live/2024/jun/29/t20-cricket-world-cup-final-india-v-south-africa-live",
        newsHeadline:
          "T20 World Cup final: India beat South Africa by seven runs to claim trophy - as it happened",
        shortDescription:
          "India triumphs over South Africa to win T20 World Cup final.",
        content:
          "India triumphed over South Africa by seven runs to win the T20 World Cup final at Kensington Oval. India, opting to bat first after winning the toss, posted a score of 176-7, with notable contributions from Virat Kohli (76) and Axar Patel (47).",
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
        id: "1",
        name: "Reuters",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Reuters_Logo.svg/1280px-Reuters_Logo.svg.png",
        url: "https://reuters.com/news/mars-colony-first-year",
        newsHeadline: "Mars Mission Hits Milestone",
        shortDescription:
          "First Martian colony completes full rotation cycle with humans.",
        content:
          "Elon Musk’s Martian vision reaches a new milestone as SpaceX's Mars One base completes its first full Martian year with 12 residents.",
      },
      {
        id: "2",
        name: "Barron's",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Barrons_Logo.svg",
        url: "https://www.barrons.com/articles/spacex-musk-launch-multiplanetary-9546ff92",
        newsHeadline:
          "SpaceX to Launch Starship Again as Elon Musk Talks Mars Colonization",
        shortDescription:
          "SpaceX prepares for ninth Starship test flight amid Mars colonization plans.",
        content:
          "SpaceX is preparing for the ninth test flight of its Starship rocket system, scheduled for May 27, 2025. Starship is central to Elon Musk’s vision of making human life multiplanetary, with the goal of colonizing Mars. Musk suggests that Starship could send ships to Mars as early as 2026, during a favorable Earth-Mars alignment.",
      },
      {
        id: "3",
        name: "Times of India",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Times_of_India_Logo.svg",
        url: "https://timesofindia.indiatimes.com/technology/social/elon-musk-one-of-the-benefits-of-going-to-mars-is/articleshow/121419565.cms",
        newsHeadline: "Elon Musk: One of the benefits of going to Mars is...",
        shortDescription:
          "Elon Musk emphasizes Mars colonization for humanity's survival.",
        content:
          "In a recent interview, Elon Musk reiterated his commitment to human colonization of Mars, emphasizing its importance for the long-term survival of humanity. He envisions making life multi-planetary as a key step toward safeguarding human civilization.",
      },
      {
        id: "4",
        name: "New York Post",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/New_York_Post_Logo.svg",
        url: "https://nypost.com/2024/09/08/business/elon-musk-predicts-crewed-spacex-flights-to-mars-by-2028-hopes-for-self-sustaining-city/",
        newsHeadline:
          "Elon Musk predicts crewed SpaceX flights to Mars by 2028",
        shortDescription:
          "Musk aims for Mars crewed missions by 2028 and a self-sustaining city.",
        content:
          "Elon Musk predicts that human-crewed flights to Mars could commence by 2028, with the ultimate goal of establishing a self-sustaining city on the planet within the next two decades. The first uncrewed Starship flights to Mars are planned to launch in two years to test landing reliability.",
      },
      {
        id: "5",
        name: "The Guardian",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/The_Guardian_Logo.svg",
        url: "https://www.theguardian.com/technology/2024/sep/15/musk-humans-live-on-mars-spacex",
        newsHeadline: "Musk says humans can be on Mars in four years",
        shortDescription:
          "Elon Musk claims humans could land on Mars within four years.",
        content:
          "In a recent statement, Elon Musk claimed that humans could land on Mars within four years and establish a self-sustaining city in 20 years. While some experts are skeptical, others believe consistent shuttle flights to Mars using SpaceX's Starship rockets are achievable.",
      },
      {
        id: "6",
        name: "NASA Spaceflight",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/NASA_Spaceflight_Logo.svg",
        url: "https://www.nasaspaceflight.com/2016/09/spacex-reveals-mars-game-changer-colonization-plan/",
        newsHeadline:
          "SpaceX reveals ITS Mars game changer via colonization plan",
        shortDescription:
          "Elon Musk unveils plans for Mars colonization with massive spacecraft.",
        content:
          "SpaceX's Elon Musk revealed details of his plans to make humanity a multiplanetary species, outlining a massive rocket and spacecraft capable of transporting at least 100 people to Mars. The plan includes establishing a self-sustaining colony on the Red Planet.",
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
        id: "1",
        name: "The Hindu",
        icon: "https://www.vhv.rs/dpng/d/493-4935300_the-hindu-newspaper-logo-png-logo-of-the.png",
        url: "https://thehindu.com/iits-ai-initiative",
        newsHeadline: "India Offers Free AI Training",
        shortDescription:
          "Top Indian institutes launch global AI education initiative.",
        content:
          "A consortium of IITs has announced a global online AI program, free for all, including verified certifications and mentorship from top professors.",
      },
      {
        id: "2",
        name: "Times of India",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Times_of_India_Logo.svg",
        url: "https://timesofindia.indiatimes.com/city/chennai/iit-madras-launches-free-ai-courses-on-swayam-plus/articleshow/120909103.cms",
        newsHeadline: "IIT Madras launches free AI courses on Swayam Plus",
        shortDescription:
          "IIT Madras introduces five free online AI courses open to all disciplines.",
        content:
          "IIT Madras has introduced five free online artificial intelligence (AI) courses on the Swayam Plus platform to enhance accessibility to AI education across various disciplines. These courses, ranging from 25 to 45 hours, cater to undergraduate and postgraduate students, faculty, and working professionals from diverse fields such as engineering, science, commerce, and arts. Importantly, no prior experience in AI or coding is required—only basic digital literacy. The course offerings include AI in physics, AI in chemistry, AI in accounting, cricket analytics with AI, and AI/ML using Python. Designed with hands-on activities and real-world case studies, the courses aim to develop practical skills. Registration is open until May 12, 2025. Professor R Sarathi, Dean (Planning) and Swayam Plus Coordinator at IIT ...  emphasized that the courses align with the National Credit Framework (NCr ...  credited as part of university curricula, helping students gain employability skills. Certification is available for a nominal fee ...  More details can be obtained by contacting pmu-sp@swayam ... .",
      },
      {
        id: "3",
        name: "IndiaAI",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/IndiaAI_Logo.svg",
        url: "https://indiaai.gov.in/article/ai-courses-and-initiatives-recently-launched-by-iits-in-india",
        newsHeadline:
          "AI courses and initiatives recently launched by IITs in India",
        shortDescription:
          "Various IITs offer online AI courses to skill and upskill Indians.",
        content:
          "Various IITs in India have been offering online courses in AI. These courses aim to skill and upskill Indians in the field of AI. Here are some of the AI courses that are open to the general public, announced by IITs recently.",
      },
      {
        id: "4",
        name: "Economic Times",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Economic_Times_Logo.svg",
        url: "https://economictimes.indiatimes.com/industry/services/education/symbiosis-launches-new-ai-institute-to-democratize-artificial-intelligence-education/articleshow/121203860.cms",
        newsHeadline:
          "Symbiosis Launches New AI Institute to Democratize Artificial Intelligence Education",
        shortDescription:
          "Symbiosis International University launches SAII to make AI education accessible.",
        content:
          "Symbiosis International University in Pune, India, has launched the Symbiosis Artificial Intelligence Institute (SAII- साई) to democratize AI education by making it accessible across academic disciplines. Spearheaded by Dr. S. B. Mujumdar and Pro-Chancellor Dr. Vidya Yeravdekar, the initiative challenges the traditional notion that AI is exclusive to computer science. SAII will offer two interdisciplinary undergraduate programs blending AI with other domains, aiming to impart both technical expertise and domain-specific insights. The institute’s mission is to cultivate responsible, ethical, and innovative use of AI for societal good. Drawing inspiration from pioneers like Alan Turing and John McCarthy, SAII emphasizes a broad understanding of AI's evolution and applications in fields such as healthcare, agriculture, and communication. The university also plans to collaborate with global tech companies and research institutions to provide hands-on experience. Ultimately, the initiative seeks to foster a generation of socially conscious leaders empowered to harness AI for inclusive development. As AI increasingly influences all aspects of life, Symbiosis’s timely move ensures AI literacy is no longer the preserve of a select few, promoting broader societal benefit.",
      },
      {
        id: "5",
        name: "Times of India",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Times_of_India_Logo.svg",
        url: "https://timesofindia.indiatimes.com/city/lucknow/ai-pragya-to-impart-digital-skills-to-10-lakh-citizens-in-up/articleshow/121040217.cms",
        newsHeadline:
          "AI Pragya to impart digital skills to 10 lakh citizens in UP",
        shortDescription:
          "Uttar Pradesh government launches AI Pragya to train citizens in digital skills.",
        content:
          "Under the AI Pragya scheme, the Uttar Pradesh government aims to train 10 lakh citizens in digital skills such as artificial intelligence, machine learning, data analytics, and cybersecurity. The initiative, launched with a short film showcasing the state's development, seeks to enhance employment opportunities and promote a startup ecosystem. Spearheaded by the Department of IT and Electronics, with the Center for e-Governance as the nodal agency, implementation will involve various state departments and be monitored locally by district magistrates. The program targets individuals from diverse backgrounds, including farmers, students, teachers, women in Self-Help Groups, village leaders, and rural service center operators. Global technology firms like Microsoft, Intel, HCL, Amazon, Google, and others are partnering to deliver high-quality training. Principal Secretary Anurag Yadav emphasized that the initiative will help citizens thrive in tech-driven sectors, while Chief Minister Yogi Adityanath highlighted its role in boosting technological efficiency across key areas such as governance, education, healthcare, and agriculture.",
      },
      {
        id: "6",
        name: "Analytics Vidhya",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Analytics_Vidhya_Logo.svg",
        url: "https://www.analyticsvidhya.com/blog/2024/08/isro-ai-free-course/",
        newsHeadline: "How to Enroll for 5 Days ISRO AI Free Courses?",
        shortDescription:
          "ISRO offers a free 5-day AI/ML course with certification.",
        content:
          "ISRO is offering a free AI/ML course from August 19-23, culminating in a certificate of completion. The course is part of ISRO’s IIRS outreach program, benefiting universities, government departments, and NGOs. It covers AI/ML basics, deep learning concepts, spaceborne Lidar systems, and practical applications using Google Earth Engine. Experts will conduct daily online lectures from 4 p.m. to 5:30 p.m., and participants need only a stable internet connection.",
      },
    ],
  },
];

const typeDefs = gql`
  type Source {
    id: ID!
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
    getArticleById(id: ID!): News
    getArticlesByCategory(category: String!): [News!]!
    getSourcesByNewsId(newsId: ID!): [Source!]!
    getSourceById(parentId: ID!, sourceId: ID!): Source
  }
`;

const resolvers = {
  Query: {
    getInitialFeed: () => {
      return newsFeed.map((news) => ({
        ...news,
        sources: news.sources.map((source) => ({
          id: source.id,
          name: source.name
        })),
      }));
    },
    getArticleById: (_, { id }) => {
      const article = newsFeed.find((news) => news.id === id);
      if (!article) {
        throw new Error("Article not found");
      }
      return article;
    },
    getArticlesByCategory: (_, { category }) => {
      return newsFeed
        .filter((news) => news.category.toLowerCase() === category.toLowerCase())
        .map((news) => ({
          ...news,
          sources: news.sources.map((source) => ({
            id: source.id,
            name: source.name,
          })),
        }));
    },
    getSourcesByNewsId: (_, { newsId }) => {
      const news = newsFeed.find((n) => n.id === newsId);
      if (!news) {
        throw new Error("News not found");
      }
      return news.sources;
    },
    getSourceById: (_, { parentId, sourceId }) => {
      console.log("Fetching source with IDs:", parentId, sourceId);
      const parent = newsFeed.find((news) => news.id === parentId);
      if (!parent) {
        throw new Error("Parent news not found");
      }
      const source = parent.sources.find((source) => source.id === sourceId);
      if (!source) {
        throw new Error("Source not found");
      }
      return source;
    },
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
