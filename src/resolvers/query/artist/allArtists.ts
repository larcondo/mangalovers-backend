import { prisma } from "@/prisma";
import { AllArtistsArgs } from "@types-app/artist";
import { handleUnknownError } from "@helpers/unknownErrors";
import { artistSelect } from "@constants/index";
import { ARTISTS_PAGE_LIMIT } from "@config/patination";
import createPagination from "@helpers/patination";

const allArtists = async (_: any, args: AllArtistsArgs) => {
  const page = args.page ?? 1;

  try {
    const artistQty = await prisma.artist.count();

    const pagination = createPagination(page, artistQty, ARTISTS_PAGE_LIMIT);

    const artists = await prisma.artist.findMany({
      select: artistSelect,
      take: ARTISTS_PAGE_LIMIT,
      skip: pagination.offset,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      pagination,
      artists,
    };
  } catch (err) {
    handleUnknownError(err, "Get All Artists failed");
  }
};

export default allArtists;
