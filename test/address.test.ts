const SOLANA = 'solana';
const ETHEREUM = 'ethereum';
const MNEMONIC = 'side lemon pool decrease kiss dune border nut barrel outer north fever';

const {createEthereum} = require('../src/ethereum/address');
const {createSolana} = require('../src/solana/address');


const NETWORK_DEVNET = {
    id: 'solana-devnet',
    blockchain: SOLANA,
    environment: 'devnet',
    name: 'Solana Devnet',
    icon: 'https://assets-cdn.trustwallet.com/blockchains/solana/info/logo.png',
    config: {
        nodeUrl: `https://api.devnet.solana.com`,
    },
};

const NETWORK = {
    id: 'ethereum-goerli',
    blockchain: ETHEREUM,
    environment: 'goerli',
    name: 'Ethereum Goerli',
    icon: 'https://assets-cdn.trustwallet.com/blockchains/ethereum/info/logo.png',
    config: {
        chainId: 5,
        openSeaUrl: 'https://testnets-api.opensea.io/api',
    },
};

describe("test  address", () => {
    test("test ethereum address", async () => {
        const account1 = await createEthereum({network: NETWORK, mnemonic: MNEMONIC});
        console.log("privateKey:"+account1.getPrivateKey());
        console.log("publicKey:"+account1.getPublicKey());
        console.log("address:"+account1.getAddress());
    })
    test("test solana(eclipse) address", async () => {
        const account = await createSolana({ network: NETWORK_DEVNET, mnemonic: MNEMONIC })
        console.log("privateKey:"+account.getPrivateKey());
        console.log("publicKey:"+account.getPublicKey());
        console.log("address:"+account.getAddress());
    })
})