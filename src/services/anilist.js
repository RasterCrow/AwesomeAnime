import {gql} from '@apollo/client';
const baseUrl = 'https://graphql.anilist.co';

//Find a way to pass sort as argument, so that all these functiosn can become one
const QUERY_TRENDING_ANIME_LIST = gql`
  query($page: Int, $perPage: Int) {
    # Define which variables will be used in the query (id)
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        bannerImage
        coverImage {
          large
        }
        title {
          english
        }
        popularity
      }
    }
  }
`;
const QUERY_POPULAR_ANIME_LIST = gql`
  query($page: Int, $perPage: Int) {
    # Define which variables will be used in the query (id)
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        bannerImage
        coverImage {
          large
        }
        title {
          english
        }
        popularity
      }
    }
  }
`;

const QUERY_TOP_ANIME_LIST = gql`
  query($page: Int, $perPage: Int) {
    # Define which variables will be used in the query (id)
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: SCORE_DESC) {
        id
        bannerImage
        coverImage {
          large
        }
        title {
          english
        }
        popularity
      }
    }
  }
`;

const GET_ANIME_INFO = gql`
  query($id: Int) {
    # Define which variables will be used in the query (id)
    Media(id: $id, type: ANIME) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
      bannerImage
      coverImage {
        extraLarge
      }
      description
      season
      status
      episodes
    }
  }
`;

export default {
  QUERY_TRENDING_ANIME_LIST,
  QUERY_POPULAR_ANIME_LIST,
  QUERY_TOP_ANIME_LIST,
  GET_ANIME_INFO,
};
