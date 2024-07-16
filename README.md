# 🔅 Agro-Insurance

This is an open-source, web3 Insurance app built on 🏗 Scaffold-ETH 2. You can insure your soybeans against the wether conditions. During the campaign of soybeans it is expected to rain between 500 and 800 mm of water. If this condition is not fulfilled, you can collect 10x the fee you paid.

**The steps are:**  
• Select the region where you produce your soyabeans  
• Pay the Fee  
• When the campaign for your region ends, and if the rain was bad you can collect the insurance.  

**Important note:**  
• You can see the mm of rain fallen in the contract's owner section.  
• To avoid wait the dates and get bored :P, there is a "testing" function (called setCurrentDate) which you can use to change the date and play accordingly.  
• You have to pass the date in unix format and this is only for testing purposes.  

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Agro-Insurance, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/hdevelopergit/agro-insurance.git agro-insurance
cd agro-insurance
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.
