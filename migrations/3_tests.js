var Test = artifacts.require("./test/Test.sol");

module.exports = function(deployer) {
  deployer.deploy(Test, {gas : 8000000});
};
