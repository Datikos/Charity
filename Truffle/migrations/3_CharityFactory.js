const contractItem = artifacts.require("CharityFactory");

module.exports = function (deployer) {
  deployer.deploy(contractItem);
};
