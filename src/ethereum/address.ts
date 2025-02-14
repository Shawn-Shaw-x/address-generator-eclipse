import {Wallet} from "@ethersproject/wallet";
// @ts-ignore
import EthereumAccount from "./EthereumAccount"


export async function createEthereum({network, mnemonic, index=0}) {
    const path = `m/44'/60'/0'/0/${index}`;
    const wallet = Wallet.fromMnemonic(mnemonic, path);
    return new EthereumAccount({network, index, path, wallet});
}

export default  {createEthereum};
