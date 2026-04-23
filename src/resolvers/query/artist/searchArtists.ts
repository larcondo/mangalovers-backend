import { prisma } from "@/prisma";
import { SearchArgs } from "@types-app/general";
import { handleUnknownError } from "@helpers/unknownErrors";
import { artistSelect } from "@constants/index";

const searchArtists = async (_: any, args: SearchArgs) => {
  const { query } = args;
  const lowerCaseQuery = query.toLowerCase();

  try {
    const artists = await prisma.artist.findMany({
      where: {
        name: {
          contains: lowerCaseQuery,
          mode: "insensitive",
        },
      },
      select: artistSelect,
    });

    return artists;
  } catch (err) {
    handleUnknownError(err, "Search Artists failed");
  }
};

export default searchArtists;
