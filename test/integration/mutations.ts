const gql = String.raw;

// ----------------------------------------
// Authorization
// ----------------------------------------
const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      accessToken
      isAdmin
    }
  }
`;

const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      username
      email
    }
  }
`;

// ----------------------------------------
// Artist
// ----------------------------------------
const CREATE_ARTIST = gql`
  mutation CreateArtist($name: String!) {
    createArtist(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_ARTIST = gql`
  mutation UpdateArtist($id: ID!, $input: UpdateArtistInput) {
    updateArtist(id: $id, input: $input) {
      id
      name
    }
  }
`;

// ----------------------------------------
// Publisher
// ----------------------------------------
const CREATE_PUBLISHER = gql`
  mutation CreatePublisher($name: String!) {
    createPublisher(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_PUBLISHER = gql`
  mutation UpdatePublisher($id: ID!, $input: UpdatePublisherInput!) {
    updatePublisher(id: $id, input: $input) {
      id
      name
    }
  }
`;

// ----------------------------------------
// Print Format
// ----------------------------------------
const CREATE_PRINT_FORMAT = gql`
  mutation CreatePrintFormat($name: String!, $description: String) {
    createPrintFormat(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const UPDATE_PRINT_FORMAT = gql`
  mutation UpdatePrintFormat($id: ID!, $input: UpdatePrintFormatInput!) {
    updatePrintFormat(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

// ----------------------------------------
// Series
// ----------------------------------------
const CREATE_SERIES = gql`
  mutation CreateSeries(
    $name: String!
    $illustratorId: ID!
    $writerId: ID!
    $printFormatId: ID!
    $publisherId: ID!
    $urlCover: String
    $isSingleVolume: Boolean
  ) {
    createSeries(
      name: $name
      illustratorId: $illustratorId
      writerId: $writerId
      printFormatId: $printFormatId
      publisherId: $publisherId
      urlCover: $urlCover
      isSingleVolume: $isSingleVolume
    ) {
      id
      name
      author {
        writer {
          id
          name
        }
        illustrator {
          id
          name
        }
      }
      publisher {
        id
        name
      }
      printFormat {
        id
        name
        description
      }
      urlCover
      isSingleVolume
    }
  }
`;

const UPDATE_SERIES = gql`
  mutation UpdateSeries($id: ID!, $input: UpdateSeriesInput!) {
    updateSeries(id: $id, input: $input) {
      id
      name
      author {
        writer {
          id
          name
        }
        illustrator {
          id
          name
        }
      }
      publisher {
        id
        name
      }
      printFormat {
        id
        name
        description
      }
      urlCover
      isSingleVolume
    }
  }
`;

// ----------------------------------------
// Volume
// ----------------------------------------
const CREATE_VOLUME = gql`
  mutation CreateVolume(
    $seriesId: ID!
    $number: Int!
    $title: String
    $urlCover: String
    $synopsis: String
    $publicationDate: Date
  ) {
    createVolume(
      seriesId: $seriesId
      number: $number
      title: $title
      urlCover: $urlCover
      synopsis: $synopsis
      publicationDate: $publicationDate
    ) {
      id
      number
      title
      synopsis
      urlCover
      publicationDate
      series {
        id
        name
      }
    }
  }
`;

const UPDATE_VOLUME = gql`
  mutation UpdateVolume($id: ID!, $input: UpdateVolumeInput!) {
    updateVolume(id: $id, input: $input) {
      id
      number
      title
      synopsis
      urlCover
      publicationDate
      series {
        id
        name
      }
    }
  }
`;

// ----------------------------------------
// UserSeries
// ----------------------------------------
export const SET_USER_SERIES = gql`
  mutation SetUserSeries($seriesId: ID!) {
    setUserSeries(seriesId: $seriesId) {
      id
      active
      activatedAt
      deactivatedAt
    }
  }
`;

export const UNSET_USER_SERIES = gql`
  mutation UnsetUserSeries($seriesId: ID!) {
    unsetUserSeries(seriesId: $seriesId) {
      id
      active
      activatedAt
      deactivatedAt
    }
  }
`;

export default {
  LOGIN,
  REGISTER,
  CREATE_ARTIST,
  UPDATE_ARTIST,
  CREATE_PUBLISHER,
  UPDATE_PUBLISHER,
  CREATE_PRINT_FORMAT,
  UPDATE_PRINT_FORMAT,
  CREATE_SERIES,
  UPDATE_SERIES,
  CREATE_VOLUME,
  UPDATE_VOLUME,
  SET_USER_SERIES,
  UNSET_USER_SERIES,
};
