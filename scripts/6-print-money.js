import sdk from "./1-initialize-sdk.js";
dotenv.config();

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken(process.env.ERC_20_TOKEN);

(async () => {
    try {
        const amount = 1000000;
        await token.mint(amount);
        const totalSupply = await token.totalSupply();
        console.log("✅ There now is", totalSupply.displayValue, "$PENG in circulation");
    } catch (error) {
        console.log("Failed to print money", error)
    }
})();