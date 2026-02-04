import { Artist } from "./artist";
import { PrintFormat } from "./printFormat";
import { Publisher } from "./publisher";

export interface Author {
  writer: string;
  illustrator: string;
}

export interface Series {
  id: string;
  name: string;
  isSingleVolume?: boolean;
  urlCover?: string;
  publisher: Publisher;
  printFormat: PrintFormat;
  illustrator: Artist;
  writer: Artist;
}

export interface AllSeriesArgs {
  page?: number;
}

export interface CreateSeriesArgs {
  name: string;
  illustratorId: string;
  writerId: string;
  printFormatId: string;
  publisherId: string;
  isSingleVolume?: boolean;
  urlCover?: string;
}
