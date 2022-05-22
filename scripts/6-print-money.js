import sdk from "./1-initialize-sdk.js";
import dotenv from 'dotenv';
dotenv.config();

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken(process.env.REACT_APP_ERC_20_TOKEN);

(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 0;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mint(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log("✅ There now is", totalSupply.displayValue, "$PENG in circulation");
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();