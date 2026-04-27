export type Artist = {
  id: string;
  name: string;
};

export interface AllArtistsArgs {
  page?: number;
}

export interface CreateArtistArgs {
  name: string;
}

export interface UpdateArtistInput {
  name?: string;
}

export interface UpdateArtistArgs {
  id: string;
  input: UpdateArtistInput;
}
