const TogethersCoin = artifacts.require("./token/TogethersCoin");
const Togethers = artifacts.require("./main/Togethers");
const Control = artifacts.require("./main/Control");

const gasLimit = 9000000

module.exports = function(deployer) {

  deployer.deploy(TogethersCoin, {gas : gasLimit}).then(function() {
    return deployer.deploy(Togethers, {gas : gasLimit});
    }).then(function() {
      return Togethers.deployed();
      }).then(function(instance) {
        return instance.useNewToken("Ethers", "ETH", Togethers.address, 0, 0, {gas : gasLimit});
        }).then(function() {
          return Togethers.deployed();
          }).then(function(instance) {
            return instance.useNewToken("TogethersCoin", "TGTC", TogethersCoin.address, 18, 1, {gas : gasLimit});
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
//ADA : DdzFFzCqrhsg9ukzjWpLEdHLL2DxwzDsAedJZVz4yGQbsRZKA1vtdV1eTprMc33frD95SfwzGKb3xbFm19G7pPV7NwGvb7vzhoYQHZa1
};
