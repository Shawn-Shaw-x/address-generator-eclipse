import {SolanaAccount} from "./SolanaAccount";
const { Keypair } = require('@solana/web3.js');
const { derivePath } = require('ed25519-hd-key');
const bip39 = require('bip39');
const SOL = 501;

export async function createSolana ({ network, mnemonic, index = 0 }) {
    const path = `m/44'/${SOL}'/${index}'/0'`;
    const keyPair = await generateKeyPair(mnemonic, path);
    return new SolanaAccount({ network, index, path, keyPair });
};


async function generateKeyPair(mnemonic, path) {
    const seed = await mnemonicToSeed(mnemonic);
    return Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
}

async function mnemonicToSeed(mnemonic) {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid seed words');
    }
    return bip39.mnemonicToSeed(mnemonic);
}

export default { createSolana };