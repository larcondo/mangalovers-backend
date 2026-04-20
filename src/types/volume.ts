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

export interface Volume {
  id: string;
  number: number;
  title?: string;
  urlCover?: string;
  synopsis?: string;
  publicationDate?: Date;
  seriesId: string;
}

export interface UpdateVolumeInput {
  number?: number;
  title?: string;
  urlCover?: string;
  synopsis?: string;
  publicationDate?: Date;
}

export interface UpdateVolumeArgs {
  id: string;
  input: UpdateVolumeInput;
}

export interface VolumeByIdArgs {
  id: string;
}

export interface VolumesBySeriesArgs {
  seriesId: string;
}
