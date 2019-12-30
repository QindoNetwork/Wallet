const TogethersCoin = artifacts.require("./token/TogethersCoin");
const Togethers = artifacts.require("./main/Togethers");
const SpaceManager = artifacts.require("./main/SpaceManager");
const SpaceOperator = artifacts.require("./main/SpaceOperator");
const Control = artifacts.require("./main/Control");

const gasLimit = 9000000

module.exports = function(deployer) {

  deployer.deploy(TogethersCoin, {gas : gasLimit}).then(function() {
    return deployer.deploy(Togethers, {gas : gasLimit});
    }).then(function() {
      return Togethers.deployed();
      }).then(function(instance) {
        return instance.useNewToken("Ethers", "ETH", Togethers.address, 0, {gas : gasLimit});
        }).then(function() {
          return Togethers.deployed();
          }).then(function(instance) {
            return instance.useNewToken("TogethersCoin", "TGTC", TogethersCoin.address, 18, {gas : gasLimit});
            }).then(function() {
              return Togethers.deployed();
              }).then(function(instance) {
                return instance.setUser("Inventor", 1,"", {gas : gasLimit});
                }).then(function() {
                  return Togethers.deployed();
                  }).then(function(instance) {
                    return instance.createGroup("Genesis", {gas : gasLimit});
                    }).then(function() {
                      return deployer.deploy(Control, {gas : gasLimit});
                      })

};
