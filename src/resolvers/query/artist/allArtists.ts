import { prisma } from "@/prisma";
import { handleUnknownError } from "@helpers/unknownErrors";

const allArtists = async () => {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    return artists;
  } catch (err) {
    handleUnknownError(err, "Get All Artists failed");
  }
};

export default allArtists;
