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
      return deployer.deploy(SpaceManager, TogethersCoin.address, Togethers.address, {gas : gasLimit});
      }).then(function() {
        return TogethersCoin.deployed();
        }).then(function(instance) {
          return instance.setEscrowContract(SpaceManager.address, {gas : gasLimit});
          }).then(function() {
            return SpaceManager.deployed();
            }).then(function(instance) {
              return instance.givePassword("84017719000013", "toto", {gas : gasLimit});
              }).then(function() {
                return SpaceManager.deployed();
                }).then(function(instance) {
                  return instance.registerSociety("toto", "ADVANCOD", "84017719000013", "Germain Anthony DA CUNHA", "advancod.pro@gmail.com", {gas : gasLimit});
                  }).then(function() {
                    return SpaceManager.deployed();
                    }).then(function(instance) {
                      return instance.approveSociety(1, {gas : gasLimit});
                      }).then(function() {
                        return deployer.deploy(SpaceOperator, SpaceManager.address, TogethersCoin.address, {gas : gasLimit});
                        }).then(function() {
                          return SpaceManager.deployed();
                          }).then(function(instance) {
                            return instance.setSpaceOperator(SpaceOperator.address, {gas : gasLimit});
                            }).then(function() {
                              return Togethers.deployed();
                              }).then(function(instance) {
                                return instance.useNewToken("Ethers", "ETH", Togethers.address, 0, {gas : gasLimit});
                                }).then(function() {
                                  return Togethers.deployed();
                                  }).then(function(instance) {
                                    return instance.setPowerToken(SpaceManager.address, {gas : gasLimit});
                                    }).then(function() {
                                      return Togethers.deployed();
                                      }).then(function(instance) {
                                        return instance.useNewToken("TogethersCoin", "TGTC", TogethersCoin.address, 18, {gas : gasLimit});
                                        }).then(function() {
                                          return Togethers.deployed();
                                          }).then(function(instance) {
                                            return instance.setUser("Inventor", 1, {gas : gasLimit});
                                            }).then(function() {
                                              return Togethers.deployed();
                                              }).then(function(instance) {
                                                return instance.createGroup("Genesis", {gas : gasLimit});
                                                }).then(function() {
                                                  return deployer.deploy(Control, {gas : gasLimit});
                                                  })

// ropsten :
//control : 0x9daeb5edb73753ce824c269229cee5b43190b063
//spaceOperator : 0x3054b0a318912cc4be1c20d728f5d3337f6c8ba9
//spaceManager : 0xddeb78a777c424f74b95c2ad29ec7b9a20802116
//Togethers : 0x6f5652668a3ba656422fe9f9737bb0893a19c808
//TogethersCoin : 0xd1908d8e5133d8a798b72ac41ad6434d290c2acd

};
