const TogethersCoin = artifacts.require("./token/TogethersCoin");
const Togethers = artifacts.require("./main/Togethers");
const SpaceManager = artifacts.require("./main/SpaceManager");
const SpaceOperator = artifacts.require("./main/SpaceOperator");

const gasLimit = 9000000

module.exports = function(deployer) {

  deployer.deploy(TogethersCoin, {gas : gasLimit}).then(function() {
    return deployer.deploy(Togethers, TogethersCoin.address, {gas : gasLimit});
    }).then(function() {
      return deployer.deploy(SpaceManager, TogethersCoin.address, Togethers.address, {gas : gasLimit});
      }).then(function() {
        return TogethersCoin.deployed();
        }).then(function(instance) {
          return instance.setEscrowContract(Togethers.address, SpaceManager.address, {gas : gasLimit});
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
                        return Togethers.deployed();
                        }).then(function(instance) {
                          return instance.setThirdParty(SpaceManager.address, {gas : gasLimit});
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
                                        return instance.useNewToken("TogethersCoin", "TGTC", TogethersCoin.address, 18, {gas : gasLimit});
                                        }).then(function() {
                                          return Togethers.deployed();
                                          }).then(function(instance) {
                                            return instance.setUser("Inventor", "", "Antho", 1, {gas : gasLimit});
                                            }).then(function() {
                                              return Togethers.deployed();
                                              }).then(function(instance) {
                                                return instance.createGroup("Genesis", {gas : gasLimit});
                                                })

};
