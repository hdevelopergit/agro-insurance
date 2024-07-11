import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployInsurance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Insurance", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const insurance = await hre.ethers.getContract<Contract>("Insurance", deployer);
  //console.log("👋 Initial greeting:", await yourContract.greeting());

  // set location period
  try {
    await insurance.setLocationPeriod("region1", 1725148800, 1748649600);
  } catch (err) {
    console.log(err);
  }
  console.log("location period region1 set");

  try {
    await insurance.setLocationPeriod("region2", 1711929600, 1732924800);
  } catch (err) {
    console.log(err);
  }
  console.log("location period region2 set");

  try {
    await insurance.setLocationPeriod("region3", 1714521600, 1732924800);
  } catch (err) {
    console.log(err);
  }
  console.log("location period region3 set");

  try {
    await insurance.setLocationPeriod("region4", 1711929600, 1730332800);
  } catch (err) {
    console.log(err);
  }
  console.log("location period region4 set");

  try {
    await insurance.setLocationPeriod("region5", 1714521600, 1730332800);
  } catch (err) {
    console.log(err);
  }
  console.log("location period region5 set");

  // Please replace the text "Your Address" with your own address.
  try {
    await insurance.transferOwnership("0x184bAEFe2b83Cfc695E2fd54f34119A2f400DD3d");
  } catch (err) {
    console.log(err);
  }
  console.log("Insurance deployed to:", await insurance.getAddress());
};

export default deployInsurance;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployInsurance.tags = ["Insurance"];
