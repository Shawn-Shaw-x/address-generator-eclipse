import {Wallet} from "@ethersproject/wallet"
import { SigningKey } from "@ethersproject/signing-key";

class EthereumAccount {
    // @ts-ignore
    private network: string;
    // @ts-ignore
    private index: number;
    // @ts-ignore
    private path: string;
    private wallet: Wallet;
    private keyPair: SigningKey;
    // @ts-ignore
    private publicKey: string;

    constructor({ network, index, path, wallet }) {
        this.network = network;
        this.index = index;
        this.path = path;
        this.wallet = wallet;
        this.keyPair = this.wallet._signingKey();
        this.publicKey = this.keyPair.publicKey;
    }

    getPrivateKey() {
        return this.keyPair.privateKey;
    }
    getAddress() {
        return this.wallet.address;
    }
    getPublicKey() {
        return this.keyPair.publicKey;
    }


}

export default EthereumAccount;
