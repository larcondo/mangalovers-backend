const gql = String.raw;

// ----------------------------------------
// Artist
// ----------------------------------------
const ARTIST_QTY = gql`
  query ArtistQty {
    artistQty
  }
`;

const ALL_ARTISTS = gql`
  query AllArtists {
    allArtists {
      id
      name
    }
  }
`;

// ----------------------------------------
// Publisher
// ----------------------------------------
const PUBLISHER_QTY = gql`
  query PublisherQty {
    publisherQty
  }
`;

const ALL_PUBLISHERS = gql`
  query AllPublishers {
    allPublishers {
      id
      name
    }
  }
`;

// ----------------------------------------
// Print Format
// ----------------------------------------
const PRINT_FORMAT_QTY = gql`
  query PrintFormatQty {
    printFormatQty
  }
`;

const ALL_PRINT_FORMATS = gql`
  query AllPrintFormats {
    allPrintFormats {
      id
      name
      description
    }
  }
`;

// ----------------------------------------
// Series
// ----------------------------------------
const SERIES_QTY = gql`
  query SeriesQty {
    seriesQty
  }
`;

const ALL_SERIES = gql`
  query AllSeries {
    allSeries {
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
const VOLUME_QTY = gql`
  query VolumeQty {
    volumeQty
  }
`;

const ALL_VOLUMES = gql`
  query AllVolumes {
    allVolumes {
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
export const USER_SERIES = gql`
  query UserSeries {
    userSeries {
      id
      series {
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
  }
`;

export default {
  ARTIST_QTY,
  ALL_ARTISTS,
  PUBLISHER_QTY,
  ALL_PUBLISHERS,
  PRINT_FORMAT_QTY,
  ALL_PRINT_FORMATS,
  SERIES_QTY,
  ALL_SERIES,
  VOLUME_QTY,
  ALL_VOLUMES,
  USER_SERIES,
};
