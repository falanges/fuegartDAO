import sdk from "./1-initialize-sdk.js";
dotenv.config();

// This is our governance contract.
const vote = sdk.getVote(process.env.GOBERNANCE_CONTRACT);

// This is our ERC-20 contract.
const token = sdk.getToken(process.env.ERC_20_TOKEN);

(async () => {
    try {
        // Give our treasury the powa to mint additional token if needed.
        await token.roles.grant("minter", vote.getAddress());
        console.log("Successfully gave vote contract permissions to act on token contract")
    } catch (error) {
    console.error('Failed to grant vote contract permissions on token contract', error);
    process.exit(1);
    }

    try {
        // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await token.balanceOf(
            process.env.WALLET_ADDRESS
        );

        // Grab 90% of the supply that we hold.
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        // Transfer 90% of the supply to our voting contract.
        await token.transfer(
            vote.getAddress(),
            percent90
        );
        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract")
    } catch (err) {
        console.error('Failed to transfer tokens to vote contract', err);
    }
})();