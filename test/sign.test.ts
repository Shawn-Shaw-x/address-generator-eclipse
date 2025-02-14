import {createSolana} from "../src/solana/address";


const SOLANA = 'solana';
const MNEMONIC = 'side lemon pool decrease kiss dune border nut barrel outer north fever';
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

describe("test  offline sign", () => {

    test("test solana(eclipse) offline sign", async () => {
        const SOL_ADDRESS = 'So11111111111111111111111111111111111111112';
        const account1 = await createSolana({ network: NETWORK_DEVNET, mnemonic: MNEMONIC })
        const account2 = await createSolana({ network: NETWORK_DEVNET, mnemonic: MNEMONIC, index: 1 });

        const amount = 0.001;
        const opts = { simulate: false };
        // 该最新区块hash去区块浏览器上获取：https://eclipsescan.xyz/blocks?cluster=testnet
        const recentBlockhash = '8ptRAMyZp8TyfKEhXQb5K2ror3EJvqviyfoqwHQxakdL';
        const result1 = await account1.createTransferTransaction(
            account2.publicKey.toBase58(),
            SOL_ADDRESS, // token 地址，原生交易固定为So11111111111111111111111111111111111111112
            amount,
            recentBlockhash,
            opts
        );
        console.log("serialized transaction :"+result1);

        // 使用curl命令向rpc测试网成功发送eth交易（ps: 这玩意跟sol的交易一毛一样，代币叫ETH，估计是wETH）
        // curl https://testnet.dev2.eclipsenetwork.xyz -s -X POST -H "Content-Type: application/json" -d '
        // {
        //     "jsonrpc": "2.0",
        //     "id": 1,
        //     "method": "sendTransaction",
        //     "params": [
        //     "5bEyK5jHAXsrbX2Lu5DvrjTPiD3rxWaoyxxTZMoSnYSgtjVM4SKxJthTHtX8GzK98ouGepCB6ANNjnzZusBDeKCkP8pdUkv2VMLU4VuArBsji3o8H9bStdNdVsgw9LuoPSi9kedTtZmJrPSSqezo7Skth3QsoGeTNGHrrDbJMM3KTvpijaH1sPSkyLS31QEiLA9xchsnDj26Uvr5ZWYuTHXu2CutrFnikxfPh2iJR5rgGbgKgL7gRydPmeZwYW7sjtzBBrAR7xr5mEbhuL5srAA5NfwyjA2FCWKbD"
        // ]
        // }
        // '
        // {"jsonrpc":"2.0","result":"4NCh2afRehJS1CLmvrqmxF89oD8fSZNk6CDfyqwjEcMM3E8Gzdaq3A71grVJGp1cFMrXDRb922JkxGqaHdDuUGXd","id":1}

    })

    // SPL代币转账（未上链测试，哪个好心人给我转几个SPL代币测一测）
    test("test solana(eclipse) offline sign (custom token)", async () => {
        const account1 =await  createSolana({ network: NETWORK_DEVNET, mnemonic: MNEMONIC, index: 0 });
        const account2 = await createSolana({ network: NETWORK_DEVNET, mnemonic: MNEMONIC, index: 1 });
        const amount = 11;
        const opts = { simulate: false };
        const TOKEN_ADDRESS = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
        // 该最新区块hash去区块浏览器上获取：https://eclipsescan.xyz/blocks?cluster=testnet
        const recentBlockhash = '8ptRAMyZp8TyfKEhXQb5K2ror3EJvqviyfoqwHQxakdL';
        const result1 = await  account1.createTransferTransaction(
            account2.publicKey.toBase58(),
            TOKEN_ADDRESS,
            amount,
            recentBlockhash,
            opts
        );
        console.log("serialized transaction :"+result1);




    })
})