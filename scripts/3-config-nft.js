import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import dotenv from 'dotenv';
dotenv.config();

const editionDrop = sdk.getEditionDrop(process.env.REACT_APP_EDITION_DROP_TOKEN);
(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Falanges fuegart NFT",
        description: "Éste NFT te dará acceso a Fuegart DAO!",
        image: readFileSync("scripts/assets/tdf.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();