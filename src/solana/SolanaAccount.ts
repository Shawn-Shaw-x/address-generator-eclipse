const bs58 = require('bs58');
import { Keypair } from '@solana/web3.js';

class SolanaAccount {
    // @ts-ignore
    private network: string;
    // @ts-ignore
    private index: number;
    // @ts-ignore
    private path: string;
    // @ts-ignore
    private keyPair: Keypair;
    // @ts-ignore
    private publicKey: Keypair.PublicKey;
    constructor({network, index, path, keyPair}) {
        this.network = network;
        this.index = index;
        this.path = path;
        this.keyPair = keyPair;
        this.publicKey = keyPair.publicKey;
    }

    getPrivateKey() {
        return bs58.encode(this.keyPair.secretKey);
    }
    getAddress() {
        return this.publicKey.toBase58();
    }
    getPublicKey() {
        return this.keyPair.publicKey;
    }
}



export { SolanaAccount };