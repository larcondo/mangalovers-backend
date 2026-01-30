import { UserDefault } from "src/types/user";
import { Artist, CreateArtistArgs } from "src/types/artist";
import { Publisher, CreatePublisherArgs } from "src/types/publisher";
import { randomUUID } from "crypto";

const users: UserDefault[] = [];
const artists: Artist[] = [];
const publishers: Publisher[] = [];

export const resolvers = {
  Query: {
    allUsers: () => users,
    allArtists: () => artists,
    artistQty: () => artists.length,
    allPublishers: () => publishers,
    publisherQty: () => publishers.length,
  },
  Mutation: {
    createArtist: (_: any, { name }: CreateArtistArgs) => {
      const newArtist: Artist = {
        id: randomUUID(),
        name,
      };
      artists.push(newArtist);
      return newArtist;
    },
    createPublisher: (_: any, { name }: CreatePublisherArgs) => {
      const newPublisher: Publisher = {
        id: randomUUID(),
        name,
      };
      publishers.push(newPublisher);
      return newPublisher;
    },
  },
};
