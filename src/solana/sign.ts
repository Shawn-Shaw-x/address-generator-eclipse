import {LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import bs58 from "bs58";
// @ts-ignore
import * as SPLToken from "@solana/spl-token";
// @ts-ignore
import {getAssociatedTokenAddress} from "@solana/spl-token";
const { createTransferInstruction } = require('@solana/spl-token');


const SOL_ADDRESS = 'So11111111111111111111111111111111111111112';


// 创建交易
export  async function createTransaction(
    fromKeyPair,
    toPublicKey,
    token,
    amount,
    recentBlockhash,
    opts = {}
){
    // @ts-ignore
    const { simulate } = opts;
    let transaction = null;
    if (token == SOL_ADDRESS) {
        transaction = await transactionSol( fromKeyPair, toPublicKey, amount,recentBlockhash);
    } else {
        // todo add spl，sql转账未测试
        transaction = await transactionSpl( fromKeyPair, toPublicKey, token, amount,recentBlockhash, opts);
    }
    const result = await  executeSignature( transaction, fromKeyPair, simulate);
    return result;
};

// eclipse原生代币
function transactionSol( fromKeyPair, toPublicKey, amount,recentBlockhash, opts = {}){
    // @ts-ignore
    const { simulate } = opts;
    const transaction = new Transaction({ feePayer: fromKeyPair.publicKey, recentBlockhash }).add(
        SystemProgram.transfer({
            fromPubkey: fromKeyPair.publicKey,
            toPubkey: toPublicKey,
            lamports: LAMPORTS_PER_SOL * amount,
        })
    );
    transaction.recentBlockhash = recentBlockhash;
    return transaction;
};

async function transactionSpl(fromKeyPair, toPublicKey, tokenAddress, amount, recentBlockhash, opts = {}){
    // @ts-ignore
    const { simulate } = opts;
    const tokenPublicKey = new PublicKey(tokenAddress)
    const fromTokenAccount = await getAssociatedTokenAddress(
        tokenPublicKey,
        fromKeyPair.publicKey,
    )
    const toTokenAccount = await getAssociatedTokenAddress( // 计算出ATA地址
        tokenPublicKey,
        toPublicKey,
    )
    const transaction = new Transaction().add(
        await createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            fromKeyPair.publicKey,
            amount
        )
    );
    transaction.recentBlockhash = recentBlockhash;
    transaction.feePayer = fromKeyPair.publicKey;
    return transaction;
}

function  executeSignature (transaction, keyPair, simulate) {
    const result = toSignTransaction( transaction, keyPair);
    return result;
};

// 签名
function toSignTransaction(transaction, keyPair){
    const serizedTransaction = signTransaction(transaction, [keyPair], {
        skipPreflight: true,
    });
    return serizedTransaction;
};

// 签名交易
function signTransaction(transaction, signersOrOptions, options){
    if (signersOrOptions === undefined || !Array.isArray(signersOrOptions)) {
        throw new Error('Invalid arguments');
    }
    const signers = signersOrOptions;
    transaction.sign(...signers);
    const wireTransaction = transaction.serialize();
    return bs58.encode(wireTransaction);
}

export default { createTransaction };