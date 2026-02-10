export type Publisher = {
  id: string;
  name: string;
};

export interface CreatePublisherArgs {
  name: string;
}

export interface UpdatePublisherInput {
  name?: string;
}

export interface UpdatePublisherArgs {
  id: string;
  input: UpdatePublisherInput;
}
