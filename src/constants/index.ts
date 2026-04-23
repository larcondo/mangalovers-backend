import { Prisma } from "generated/prisma/client";

export const artistSelect: Prisma.ArtistSelect = {
  id: true,
  name: true,
} as const;

export const printFormatSelect: Prisma.PrintFormatSelect = {
  id: true,
  name: true,
  description: true,
} as const;

export const publisherSelect: Prisma.PublisherSelect = {
  id: true,
  name: true,
} as const;

export const seriesSelect: Prisma.SeriesSelect = {
  id: true,
  name: true,
  urlCover: true,
  isSingleVolume: true,
  writer: {
    select: artistSelect,
  },
  illustrator: {
    select: artistSelect,
  },
  printFormat: {
    select: printFormatSelect,
  },
  publisher: {
    select: publisherSelect,
  },
} as const;

export const volumeSelect: Prisma.VolumeSelect = {
  id: true,
  number: true,
  publicationDate: true,
  synopsis: true,
  title: true,
  urlCover: true,
  series: {
    select: seriesSelect,
  },
} as const;
