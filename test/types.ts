type ArtistBasic = {
  id: number;
  name: string;
};

type PublisherBasic = {
  id: number;
  name: string;
};

type PrintFormatBasic = {
  id: number;
  name: string;
  description: string | null;
};

// type TSeries = Prisma.SeriesGetPayload<{ ... }>;
type TestSeries = {
  id: string;
  name: string;
  isSingleVolume: boolean;
  urlCover: string | null;
  writer: ArtistBasic;
  illustrator: ArtistBasic;
  publisher: PublisherBasic;
  printFormat: PrintFormatBasic;
};

type TestVolume = {
  id: string;
  number: number;
  title?: string;
  urlCover?: string;
  synopsis?: string;
  publicationDate?: string;
  series: TestSeries;
};
