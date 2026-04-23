import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";
import { artistSelect } from "@constants/index";

const allArtists = async () => {
  try {
    const artists = await prisma.artist.findMany({
      select: artistSelect,
      orderBy: {
        createdAt: "desc",
      },
    });

    return artists;
  } catch (err) {
    handleUnknownError(err, "Get All Artists failed");
  }
};

export default allArtists;
