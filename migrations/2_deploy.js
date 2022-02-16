// const { ethers, upgrades } = require("hardhat");

// async function main()
// {
// const Box = await ethers.getContractFactory("NFTMarketplaceUpgradable");

// const box = await upgrades.deployProxy(NFTMarketplaceUpgradable, ["CTokem","CT",'https;//www.googlw.com','0xb20b32f703BB2EF7C9b9a7363E159aD771338C26'], {
//     initializer:"initialze",
//  });
// await box.deployed();

// console.log("Box deployed to :",box.address);

// }

// main();





// const ColorTokenERC721 = artifacts.require('ColorTokenERC721');

// module.exports = function (deployer) {
//   deployer.deploy(ColorTokenERC721, 'ColorToken', 'CT').then(() => {
//     console.log('VXERC20 contract address is: ', ColorTokenERC721.address);
//   });
// };


const NFTMarketplaceUpgradable = artifacts.require("NFTMarketplaceUpgradable");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(NFTMarketplaceUpgradable, ["CTokem","CT",'https;//www.google.com/','0xb20b32f703BB2EF7C9b9a7363E159aD771338C26'], { deployer });
  console.log('Deployed', instance.address);
};