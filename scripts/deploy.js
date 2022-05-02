
const hre = require("hardhat");

async function main() {
  
  const RobotPunks = await hre.ethers.getContractFactory("RobotPunksNFT");
  const robotPunks = await RobotPunks.deploy();

  await robotPunks.deployed();

  console.log("RobotPunks deployed to:", robotPunks.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
