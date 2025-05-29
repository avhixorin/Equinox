import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setFeed } from "@/redux/feedSlice";

const GET_NEWS = gql`
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
        icon
        url
        newsHeadline
        shortDescription
        content
      }
    }
  }
`;

export const useInitialFeed = () => {
  const dispatch = useDispatch();

  const { data, loading, error, refetch } = useQuery(GET_NEWS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading && data?.getInitialFeed) {
      dispatch(setFeed(data.getInitialFeed));
    }
  }, [data, dispatch, loading]);

  return { data, loading, error, refetch };
};
