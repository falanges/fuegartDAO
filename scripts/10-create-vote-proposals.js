import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is our governance contract.
const vote = sdk.getVote(process.env.GOBERNANCE_CONTRACT);

// This is our ERC-20 contract.
const token = sdk.getToken(process.env.ERC_20_TOKEN);

(async () => {
    try {
        // Create proposal to miny 420,000 new token to the treasury.
        const amount = 420_000;
        const description = "Debería fuegartDAO mintear una suma adicional de " + amount + " tokens dentro del tesoro? ";
        const executions = [
            {
                // Our token contract that actually executes the mint.
                toAddress: token.getAddress(),
                // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                // to send in this proposal. In this case, we're sending 0 ETH.
                // We're just minting new tokens to the treasury. So, set to 0.
                nativeTokenValue: 0,
                // We're doing a mint! And, we're minting to the vote, which is
                // acting as our treasury.
                // in this case, we need to use ethers.js to convert the amount
                // to the correct format. This is because the amount it requires is in wei.
                transactionData: token.encoder.encode(
                    "mintTo", [
                    vote.getAddress(),
                    ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
            }
        ];
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error('Failed to create first proposal', error);
        process.exit(1);
    }
    try {
        // Create proposal to transfer ourselves 6, 900 tokens for being awesome.
        const amount = 6_900;
        const description = "Debería fuegartDAO transferir " + amount + " de tokens a " + process.env.WALLET_ADDRESS + " por ser así de copado?";
        const executions = [
            {
                // Again, we're sending ourselves 0 ETH. Just sending our own token
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "transfer", [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            },
        ];
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!")
    } catch (error) {
        console.error('Failed to create second proposal', error);
    }
})();