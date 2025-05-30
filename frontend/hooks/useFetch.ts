import { gql, useApolloClient } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setFeed } from "@/redux/feedSlice";

const GET_INITIAL_FEED = gql`
  query {
    getInitialFeed {
      id
      category
      time
      title
      views
      shares
      image
      sources {
        id
        name
      }
    }
  }
`;

const GET_ARTICLE_BY_ID = gql`
  query ($id: ID!) {
    getArticleById(id: $id) {
      id
      category
      time
      title
      views
      shares
      image
      sources {
        id
        name
        icon
        newsHeadline
      }
    }
  }
`;

const GET_ARTICLES_BY_CATEGORY = gql`
  query ($category: String!) {
    getArticlesByCategory(category: $category) {
      id
      category
      time
      title
      views
      shares
      image
      sources {
        id
        name
        icon
      }
    }
  }
`;

const GET_ARTICLES_BY_SOURCE = gql`
  query ($sourceId: Id) {
    getArticleBySource(sourceId: $sourceId) {
      id
      category
      time
      title
      views
      shares
      image
      sources {
        id
        name
        icon
      }
    }
  }
`;

const GET_SOURCE_BY_ID = gql`
  query ($parentId: ID!,$sourceId: ID!) {
    getSourceById(parentId: $parentId, sourceId: $sourceId) {
      id
      name
      icon
      url
      newsHeadline
      shortDescription
      content
    }
  }
`;

export const useFetch = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const fetchInitialFeed = async () => {
    try {
      await client.clearStore();
      const { data, loading, error } = await client.query({
        query: GET_INITIAL_FEED,
        fetchPolicy: "no-cache",
      });

      if (data?.getInitialFeed) {
        dispatch(setFeed(data.getInitialFeed));
      }

      return { initialFeed: data.getInitialFeed, loading, error };
    } catch (err) {
      return { initialFeed: null, loading: false, error: err };
    }
  };

  const fetchArticleById = async (id: string) => {
    try {
      const { data, loading, error } = await client.query({
        query: GET_ARTICLE_BY_ID,
        variables: { id },
        fetchPolicy: "no-cache",
      });
      return { articleById: data.getArticleById, loading, error };
    } catch (err) {
      return { articleById: null, loading: false, error: err };
    }
  };

  const fetchArticleByCategory = async (category: string) => {
    try {
      const { data, loading, error } = await client.query({
        query: GET_ARTICLES_BY_CATEGORY,
        variables: { category },
        fetchPolicy: "no-cache",
      });
      return { articlesByCategory: data.getArticlesByCategory, loading, error };
    } catch (err) {
      return { articlesByCategory: null, loading: false, error: err };
    }
  };

  const fetchArticleBySource = async (sourceId: string) => {
    try {
      const { data } = await client.query({
        query: GET_ARTICLES_BY_SOURCE,
        variables: { sourceId },
        fetchPolicy: "no-cache",
      });
      return { articlesBySource: data.getArticleBySource };
    } catch (err) {
      return { articlesBySource: null, error: err };
    }
  };

  const fetchSourceById = async (parentId: string, sourceId: string) => {
    try {
      const { data, loading, error } = await client.query({
        query: GET_SOURCE_BY_ID,
        variables: { parentId, sourceId },
        fetchPolicy: "no-cache",
      });
      return { sourceById: data.getSourceById, loading, error };
    } catch (err) {
      return { sourceById: null, loading: false, error: err };
    }
  };

  return {
    fetchInitialFeed,
    fetchArticleById,
    fetchArticleByCategory,
    fetchArticleBySource,
    fetchSourceById,
  };
};
