export interface AllVolumesArgs {
  page?: number;
}

export interface CreateVolumeArgs {
  seriesId: string;
  number: number;
  title?: string;
  urlCover?: string;
  synopsis?: string;
  publicationDate?: Date;
}
