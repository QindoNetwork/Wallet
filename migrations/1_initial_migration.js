var Migrations = artifacts.require("./owner/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations, {gas : 8000000});
};
