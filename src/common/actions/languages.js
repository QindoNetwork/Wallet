import { Languages as LanguagesService } from '@common/services';
import { languages as LanguagesStore } from '@common/stores';

export function selectActiveLanguage(language) {
    return LanguagesService.saveActiveLanguage(language)
        .then(() => LanguagesStore.setSelectedLanguage(language));
}

// Login';
export function choosePseudonyme(language) {
  switch (language) {
      case 'en':
      return "Choose pseudonyme"
      case 'fr':
      return "Choisir pseudonyme"
      default:
      return "Choose pseudonyme"
  }
}


// ConfirmMnemonics';
// ConfirmTransaction';
// CreateMnemonics';
// CreateWallet';
// LoadMnemonics';
// NewWallet';
// NewWalletName';
// ReceiveCoins';
// SendCoins';
// Settings';
// SelectDestination';
// WalletDetails';
// WalletExtract';
// WalletSettings';
// WalletsOverview';
// AddProfile';
// AskGroup';
// CreateGroup';
// Crypto';
// ProfileData';
// Profiles';
// Groups';
// AddGroup';
// OpenDemand';
// CloseDemand';
// CryptoType1';
// CryptoType2';
// SendCoinsType1';
// ChangeCrypto';
// ChangePseudonyme';
// ChangePassword';
// AdminProfile';
// ChangeLanguage';
