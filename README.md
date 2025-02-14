# **钱包对接eclipse链调研文档**

## **1. 项目概述**

* **项目名称**：Eclipse 项目调研
* **区块链网络**：Eclipse（Ethereum Layer2）
* **钱包类型**：自研钱包
* **目标功能**：账户管理、转账、跨链桥、查询余额、智能合约交互等

## **2. 区块链基本信息**

* **链类型**：公链 (Ethereum Layer2)
* **交易模型**：账户模型
* **是否支持tag（memo）**：否
* **是否多链结构**：否
* **共识机制**：Optimistic + ZK
* **主网**：`https://app.eclipse.xyz/bridge?target=deposit`
* **测试网**：`https://app.eclipse.xyz/bridge?target=deposit`
* **主网rpc节点**：`https://mainnetbeta-rpc.eclipse.xyz`
* **测试网rpc节点**：`https://testnet.dev2.eclipsenetwork.xyz`
* **区块浏览器**: `https://eclipsescan.xyz/?cluster=mainnet`
* **区块时间**：358ms(与solana一致)
* **代币**：暂无发币计划，使用ETH作为Eclipse主网代币，可通过跨链桥转移ETH或者跨链转SOL、USDC到eclipse网络
* **代币精度**：9(与solana一致)
* **交易费用机制**：使用wETH（价值与ETH相等）作为gas费
* **智能合约支持**：支持solana标准合约（使用rust编写），可和eclipse链上的openBook交互。支持SPL标准
* **简要介绍**：是一个采用Solana技术的Ethereum Layer2跨链桥。通过打包交易到Ethereum上去拓展Ethereum网络的吞吐量和降低Ethereum网络的手续费。结合Solana网络的高性能和低手续费和Ethereum网络的高安全性。

## **3. 钱包账户体系**

* **地址格式**：

    * 编码格式：base58
    * 地址长度：44bytes
* **助记词（Mnemonic）**

    * 标准：BIP-39
    * 推导路径（HD Path）：m/44'/${SOL}'/${index}'/0'(与solana地址推导路径一致)
* **私钥/公钥格式**

    * 加密算法：Ed25519
    * 私钥长度：88bytes
    * 公钥长度：44bytes

## **4. 交易处理流程**

* **交易结构**
    * 交易字段：发送方、接收方、金额、代币地址、recentBlockhash 等
    * 交易 ID 计算方式：发送到区块链网络中返回txid
* **交易签名机制**
    * 签名算法：Ed25519
    * 哈希算法：SHA-256
    * 签名序列化格式：Protobuf
* **交易广播方式**
    * 构造交易后进行对交易签名，base58编码后，通过 RPC 发送

## **5. RPC 交互与扫链（与solana网络保持一致）**

* **官方节点 / 自建节点 / 第三方服务**
* **API 访问方式**：REST / WebSocket / gRPC
* **关键接口**：
    * 获取账户余额：getBalance
    * 模拟交易：simulateTransaction
    * 发送交易：sendTransaction
    * 查询最新区块hash：getRecentBlockhash
    * 查询交易状态：getTransaction
* **身份认证方式**：API Key


## **6. 安全性考虑**

* **私钥存储方案**：本地存储
* **交易防重放机制**：Nonce账户 /recentBlockhash

## **7. 兼容性 & SDK 选择**

* **官方 SDK**：[钱包签名库](https://github.com/Eclipse-Laboratories-Inc/eclipse-wallet-adapter.git)
* **第三方库支持**：@solana/web3.js、 @solana/spl-token、bip39、bs58
* **移动端支持**：iOS / Android / 浏览器网页 / 浏览器插件

## **8. 参考资料**

* **官方文档**：https://docs.eclipse.xyz/

