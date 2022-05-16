import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(process.env.EDITION_DROP_TOKEN);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "falanges fuegart NFT",
        description: "Éste NFT te dará acceso a  Fuegart DAO!",
        image: readFileSync("scripts/assets/tdf.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();