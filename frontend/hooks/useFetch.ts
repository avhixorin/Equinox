import { gql, useQuery } from "@apollo/client";

const GET_NEWS = gql`
  query {
    getInitialFeed {
      id
      category
      time
      title
      views
      shares
      sources
      image
    }
  }
`;

export const useInitialFeed = () => {
  const { data, loading, error } = useQuery(GET_NEWS);

  return { data, loading, error };
};
