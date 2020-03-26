import { Contracts as contractsAddress } from '@common/constants';

export function getIdentity(transaction) {
  switch (transaction.toLowerCase()) {
      case contractsAddress.togethersAddress.toLowerCase():
      return 'Togethers'
      case contractsAddress.ttusd.toLowerCase():
      return 'TGTU stablecoin'
      case contractsAddress.tteur.toLowerCase():
      return 'TGTE stablecoin'
      case contractsAddress.dai.toLowerCase():
      return 'DAI Stablecoin'
      case contractsAddress.Gemini.toLowerCase():
      return 'Gemini stablecoin'
      case contractsAddress.Tether.toLowerCase():
      return 'Tether stablecoin'
      case contractsAddress.Stasis.toLowerCase():
      return 'Stasis stablecoin'
      case contractsAddress.TrueUSD.toLowerCase():
      return 'TrueUSD stablecoin'
      case contractsAddress.Paxos.toLowerCase():
      return 'Paxos stablecoin'
      case contractsAddress.USDCoin.toLowerCase():
      return 'USDCoin stablecoin'
      case contractsAddress.Augmint.toLowerCase():
      return 'Augmint stablecoin'
      case '':
      return 'Other contract'
      default:
      return transaction
  }
}

export function getHomeStableName(i) {
  switch (i) {
      case 2:
      return 'Togethers-EUR'
      case 1:
      return 'Togethers-USD'
      default:
      return 'Ethers'
  }
}

export function getHomeStableSymbol(i) {
  switch (i) {
      case 2:
      return 'TGTE'
      case 1:
      return 'TGTU'
      default:
      return 'ETH'
  }
}
