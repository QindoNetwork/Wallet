import { Languages as LanguagesService } from '@common/services';
import { languages as LanguagesStore } from '@common/stores';

export function selectActiveLanguage(language) {
    return LanguagesService.saveActiveLanguage(language)
        .then(() => LanguagesStore.setSelectedLanguage(language));
}

export function loadLanguage() {
    return LanguagesService.loadActiveLanguage()
        .then(language => LanguagesStore.setSelectedLanguage(language));
}

export function label1(language) {
  switch (language) {
      case 'en':
      return "This group does not exists"
      case 'fr':
      return "Ce groupe n'existe pas"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label2(language) {
  switch (language) {
      case 'en':
      return "You already asked"
      case 'fr':
      return "Vous avez deja demandé"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label3(language) {
  switch (language) {
      case 'en':
      return "This user did not ask to apply"
      case 'fr':
      return "Cet utilisateur n'a pas fait de demande"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label4(language) {
  switch (language) {
      case 'en':
      return "Is member already"
      case 'fr':
      return "Ce membre fait déja pati du groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label5(language) {
  switch (language) {
      case 'en':
      return 'Password not good'
      case 'fr':
      return "Mauvais mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label6(language) {
  switch (language) {
      case 'en':
      return 'Username unavailable'
      case 'fr':
      return "Pseudonyme non disponible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label7(language) {
  switch (language) {
      case 'en':
      return "The user have to close his demand"
      case 'fr':
      return "L'utilisateur doit d'abord fermer sa cagnotte"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label8(language) {
  switch (language) {
      case 'en':
      return "Create a new group"
      case 'fr':
      return "Créer un nouveau groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label9(language) {
  switch (language) {
      case 'en':
      return "Apply for an existing one"
      case 'fr':
      return "Entrer dans un groupe existant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label10(language) {
  switch (language) {
      case 'en':
      return "Destination address"
      case 'fr':
      return "Destinataire"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label11(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continue"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label12(language) {
  switch (language) {
      case 'en':
      return "Transfer ownership"
      case 'fr':
      return "Rendre administrateur"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label13(language) {
  switch (language) {
      case 'en':
      return "Remove user"
      case 'fr':
      return "Supprimer ce membre"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label14(language) {
  switch (language) {
      case 'en':
      return "Group ID"
      case 'fr':
      return "Identifiant du groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label15(language) {
  switch (language) {
      case 'en':
      return "Apply"
      case 'fr':
      return "Demander"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label16(language) {
  switch (language) {
      case 'en':
      return "Old password"
      case 'fr':
      return "Ancien mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label17(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label18(language) {
  switch (language) {
      case 'en':
      return "New password"
      case 'fr':
      return "Nouveau mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label19(language) {
  switch (language) {
      case 'en':
      return "Confirm password"
      case 'fr':
      return "Confirmer mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label20(language) {
  switch (language) {
      case 'en':
      return "New username"
      case 'fr':
      return "Nouveau pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label21(language) {
  switch (language) {
      case 'en':
      return "Username"
      case 'fr':
      return "Pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label22(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label23(language) {
  switch (language) {
      case 'en':
      return "Close"
      case 'fr':
      return "Fermer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label24(language) {
  switch (language) {
      case 'en':
      return "Uncorrect"
      case 'fr':
      return "Faux"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label25(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continue"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label26(language) {
  switch (language) {
      case 'en':
      return "Cancel"
      case 'fr':
      return "Annuler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label27(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label28(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continuer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label29(language) {
  switch (language) {
      case 'en':
      return "Cancel"
      case 'fr':
      return "Annuler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label30(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label31(language) {
  switch (language) {
      case 'en':
      return "Group name"
      case 'fr':
      return "Nom du groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label32(language) {
  switch (language) {
      case 'en':
      return "Create a new group"
      case 'fr':
      return "Nouveau groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}


export function label33(language) {
  switch (language) {
      case 'en':
      return "Save carefully your sequence of mnemonics"
      case 'fr':
      return "Concervez votre mnemonics avec prudence"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label34(language) {
  switch (language) {
      case 'en':
      return "Proceed"
      case 'fr':
      return "Continuer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label35(language) {
  switch (language) {
      case 'en':
      return "When creating a new wallet you will receive a sequence of mnemonics which represent your personal password. Anyone with this sequence may be able to reconfigure your wallet in any new device. Keep it stored as secure as possible. Only you should have access to this information."
      case 'fr':
      return "Lorsque vous créez un nouveau porte feuille vous recevez votre mnemonic qui représente votre mot de passe personnel, concervez le de la manière la plus prudente possible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label36(language) {
  switch (language) {
      case 'en':
      return "Write it somewhere safe so you can make sure you won't lose it, or you may lose permanently all your coins. There is no way to recover it later."
      case 'fr':
      return "Ecrivez le quelque part ou vous ne le perderez pas sous rique de perdre vos coins"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label37(language) {
  switch (language) {
      case 'en':
      return "Proceed"
      case 'fr':
      return "Continuer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label38(language) {
  switch (language) {
      case 'en':
      return "Groups"
      case 'fr':
      return "Groupes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label39(language) {
  switch (language) {
      case 'en':
      return "Add a group"
      case 'fr':
      return "Ajouter un groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label40(language) {
  switch (language) {
      case 'en':
      return "New wallet saved"
      case 'fr':
      return "Nouveau porte feuille créé"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label41(language) {
  switch (language) {
      case 'en':
      return 'Type the mnemonic here in one line'
      case 'fr':
      return "Entrez le mnemonic en une seule ligne"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label42(language) {
  switch (language) {
      case 'en':
      return "Open wallet"
      case 'fr':
      return "Ouvrir le porte feuille"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
}
}

export function label43(language) {
  switch (language) {
      case 'en':
      return "Low balance, you need ether to register, show the code below to receive ethers and enter to the community!"
      case 'fr':
      return "Vous avez besoin d'ethers pour vous enregistrer, utilisez le qrCode"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label44(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label45(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label46(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label47(language) {
  switch (language) {
      case 'en':
      return "Passwords not equals"
      case 'fr':
      return "Les mots de passe de correspondent pas"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label48(language) {
  switch (language) {
      case 'en':
      return "This username already exists"
      case 'fr':
      return "Ce pseudonyme n'est pas disponible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label49(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label50(language) {
  switch (language) {
      case 'en':
      return "Confirm password"
      case 'fr':
      return "Confirmer mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label51(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label52(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label53(language) {
  switch (language) {
      case 'en':
      return "Username"
      case 'fr':
      return "Pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label54(language) {
  switch (language) {
      case 'en':
      return "Do you already have a wallet to configure?"
      case 'fr':
      return "Avez vous déja un porte feuille à importer?"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label55(language) {
  switch (language) {
      case 'en':
      return "Yes, load it"
      case 'fr':
      return "Oui, importer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label56(language) {
  switch (language) {
      case 'en':
      return "No, create new"
      case 'fr':
      return "Non, créer un nouveau"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label57(language) {
  switch (language) {
      case 'en':
      return "User unavailable"
      case 'fr':
      return "Pseudonyme indisponible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}


export function label58(language) {
  switch (language) {
      case 'en':
      return "Choose your pseudonyme"
      case 'fr':
      return "Choisir un pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label59(language) {
  switch (language) {
      case 'en':
      return "Name"
      case 'fr':
      return "Nom"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label60(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label61(language) {
  switch (language) {
      case 'en':
      return "Description"
      case 'fr':
      return "Description"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label62(language) {
  switch (language) {
      case 'en':
      return "Demand"
      case 'fr':
      return "Demander"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label63(language) {
  switch (language) {
      case 'en':
      return "Global stats"
      case 'fr':
      return "Statistiques"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label64(language) {
  switch (language) {
      case 'en':
      return "Input"
      case 'fr':
      return "Entrant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label65(language) {
  switch (language) {
      case 'en':
      return "Send Cryptos"
      case 'fr':
      return "Envoyer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label66(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label67(language) {
  switch (language) {
      case 'en':
      return "Into"
      case 'fr':
      return "En"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label68(language) {
  switch (language) {
      case 'en':
      return "Togethers balances"
      case 'fr':
      return "Togethers soldes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label69(language) {
  switch (language) {
      case 'en':
      return "Inbox"
      case 'fr':
      return "Dans la cagnotte"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label70(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label71(language) {
  switch (language) {
      case 'en':
      return "Swap"
      case 'fr':
      return "Echanger"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label72(language) {
  switch (language) {
      case 'en':
      return "Your balances"
      case 'fr':
      return "Vos soldes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label73(language) {
  switch (language) {
      case 'en':
      return "friends"
      case 'fr':
      return "amis"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label74(language) {
  switch (language) {
      case 'en':
      return "Show the code below to receive coins"
      case 'fr':
      return "Montrer ce code pour recevoir des cryptos"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label75(language) {
  switch (language) {
      case 'en':
      return "Destination address"
      case 'fr':
      return "Destination"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label76(language) {
  switch (language) {
      case 'en':
      return "You don't have enough balance"
      case 'fr':
      return "Solde trop faible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label77(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continuer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label78(language) {
  switch (language) {
      case 'en':
      return "You or contract don t have enough balance"
      case 'fr':
      return "Trop élevé"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label79(language) {
  switch (language) {
      case 'en':
      return 'Erase wallets'
      case 'fr':
      return "Supprimer les portes feuilles"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label80(language) {
  switch (language) {
      case 'en':
      return 'This action cannot be undone. Are you sure?'
      case 'fr':
      return "Aucun retour arrière possible, ètes vous sur?"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label81(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label82(language) {
  switch (language) {
      case 'en':
      return 'erase'
      case 'fr':
      return "effacer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label83(language) {
  switch (language) {
      case 'en':
      return 'Erase wallets'
      case 'fr':
      return "supprimer les portes feuilles"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label84(language) {
  switch (language) {
      case 'en':
      return 'Change language'
      case 'fr':
      return "Changer de langue"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label85(language) {
  switch (language) {
      case 'en':
      return 'Historic'
      case 'fr':
      return "Extrait"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label86(language) {
  switch (language) {
      case 'en':
      return 'Receive'
      case 'fr':
      return "Recevoir"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label87(language) {
  switch (language) {
      case 'en':
      return 'Send'
      case 'fr':
      return "Envoyer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label88(language) {
  switch (language) {
      case 'en':
      return 'Network'
      case 'fr':
      return "Réseau"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label89(language) {
  switch (language) {
      case 'en':
      return 'Swap'
      case 'fr':
      return "Echanger"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label90(language) {
  switch (language) {
      case 'en':
      return 'Settings'
      case 'fr':
      return "Options"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label91(language) {
  switch (language) {
      case 'en':
      return 'There are still no transactions involving this wallet.'
      case 'fr':
      return "Aucune transaction"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label92(language) {
  switch (language) {
      case 'en':
      return 'Yes'
      case 'fr':
      return "Oui"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label93(language) {
  switch (language) {
      case 'en':
      return 'No'
      case 'fr':
      return "Non"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label94(language) {
  switch (language) {
      case 'en':
      return 'Copied to clipboard'
      case 'fr':
      return "Copié"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label95(language) {
  switch (language) {
      case 'en':
      return 'From'
      case 'fr':
      return "De"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label96(language) {
  switch (language) {
      case 'en':
      return 'To'
      case 'fr':
      return "Vers"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label97(language) {
  switch (language) {
      case 'en':
      return 'Close'
      case 'fr':
      return "Fermer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label98(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label99(language) {
  switch (language) {
      case 'en':
      return 'Gas used'
      case 'fr':
      return "Gas utilisé"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label100(language) {
  switch (language) {
      case 'en':
      return 'Error'
      case 'fr':
      return "Erreur"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label101(language) {
  switch (language) {
      case 'en':
      return 'Transaction hash'
      case 'fr':
      return "Identifiant de la transaction"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label102(language) {
  switch (language) {
      case 'en':
      return 'Copy'
      case 'fr':
      return "Copier"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label103(language) {
  switch (language) {
      case 'en':
      return 'Remove wallet'
      case 'fr':
      return "Supprimer porte feuille"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label104(language) {
  switch (language) {
      case 'en':
      return 'This action cannot be undone. Are you sure?'
      case 'fr':
      return "Ne peut être annulé, ètes vous sur?"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label105(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label106(language) {
  switch (language) {
      case 'en':
      return 'Remove'
      case 'fr':
      return "Supprimer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label107(language) {
  switch (language) {
      case 'en':
      return 'Remove wallet'
      case 'fr':
      return "Supprimer porte feuille"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label108(language) {
  switch (language) {
      case 'en':
      return 'Password'
      case 'fr':
      return "Mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label109(language) {
  switch (language) {
      case 'en':
      return 'User name'
      case 'fr':
      return "Pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label110(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label111(language) {
  switch (language) {
      case 'en':
      return 'Unknown function'
      case 'fr':
      return "Fonction inconnue"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label112(language) {
  switch (language) {
      case 'en':
      return 'Success, wait for confirmation in historic'
      case 'fr':
      return "OK, Attendez la confirmation dans l'historique"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label113(language) {
  switch (language) {
      case 'en':
      return 'Low balance'
      case 'fr':
      return "Solde trop faible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label114(language) {
  switch (language) {
      case 'en':
      return 'Approximatly'
      case 'fr':
      return "Environ"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label115(language) {
  switch (language) {
      case 'en':
      return 'Continue'
      case 'fr':
      return "Continuer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label116(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label117(language) {
  switch (language) {
      case 'en':
      return 'Password'
      case 'fr':
      return "Mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label118(language) {
  switch (language) {
      case 'en':
      return 'Enter password'
      case 'fr':
      return "Entrez mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label119(language) {
  switch (language) {
      case 'en':
      return 'You have to be administrator to add a member to the group'
      case 'fr':
      return "Vous devez ètre administrateur pour ajouter un membre a ce groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label120(language) {
  switch (language) {
      case 'en':
      return 'My demand'
      case 'fr':
      return "Ma cagnotte"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label121(language) {
  switch (language) {
      case 'en':
      return 'Quit group'
      case 'fr':
      return "Quitter ce groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label122(language) {
  switch (language) {
      case 'en':
      return 'group'
      case 'fr':
      return "groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label123(language) {
  switch (language) {
      case 'en':
      return 'friend'
      case 'fr':
      return "ami"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label124(language) {
  switch (language) {
      case 'en':
      return 'Unknown'
      case 'fr':
      return "Inconnu"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label125(language) {
  switch (language) {
      case 'en':
      return 'Confirm'
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label126(language) {
  switch (language) {
      case 'en':
      return 'Enter Password'
      case 'fr':
      return "Entrer mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label127(language) {
  switch (language) {
      case 'en':
      return 'Password not good'
      case 'fr':
      return "Mauvais mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label128(language) {
  switch (language) {
      case 'en':
      return 'Success, wait for confirmation in historic'
      case 'fr':
      return "OK, attendre la confirmation dans l'historique"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label129(language) {
  switch (language) {
      case 'en':
      return 'Wallet address'
      case 'fr':
      return "Addresse"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label130(language) {
  switch (language) {
      case 'en':
      return 'Name'
      case 'fr':
      return "Nom"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label131(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label132(language) {
  switch (language) {
      case 'en':
      return 'Wallet address'
      case 'fr':
      return "Addresse"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label133(language) {
  switch (language) {
      case 'en':
      return 'Name'
      case 'fr':
      return "Nom"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label134(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label135(language) {
  switch (language) {
      case 'en':
      return 'Group'
      case 'fr':
      return "Groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label136(language) {
  switch (language) {
      case 'en':
      return 'Confirm payment'
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label137(language) {
  switch (language) {
      case 'en':
      return "Confirm payment"
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label138(language) {
  switch (language) {
      case 'en':
      return "Confirm"
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label139(language) {
  switch (language) {
      case 'en':
      return "Enter Password"
      case 'fr':
      return "Entrer mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label140(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label141(language) {
  switch (language) {
      case 'en':
      return "Success, wait for confirmation in historic"
      case 'fr':
      return "OK, attendre confirmation"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label142(language) {
  switch (language) {
      case 'en':
      return "Wallet address"
      case 'fr':
      return "Addresse"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label143(language) {
  switch (language) {
      case 'en':
      return "Amount"
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label144(language) {
  switch (language) {
      case 'en':
      return "Fees"
      case 'fr':
      return "Frais"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label145(language) {
  switch (language) {
      case 'en':
      return "Confirm swap"
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label146(language) {
  switch (language) {
      case 'en':
      return "Confirm & open wallet"
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label147(language) {
  switch (language) {
      case 'en':
      return "Your donnation"
      case 'fr':
      return "Votre don actuel"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label148(language) {
  switch (language) {
      case 'en':
      return "Amount"
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label149(language) {
  switch (language) {
      case 'en':
      return "Global stats"
      case 'fr':
      return "Statistiques"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label150(language) {
  switch (language) {
      case 'en':
      return "Output"
      case 'fr':
      return "Sortant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label151(language) {
  switch (language) {
      case 'en':
      return "Inbox"
      case 'fr':
      return "Entrant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label152(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label153(language) {
  switch (language) {
      case 'en':
      return "Details"
      case 'fr':
      return "Details"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label154(language) {
  switch (language) {
      case 'en':
      return "Send"
      case 'fr':
      return "Envoyer"
  }
}

export function label155(language) {
  switch (language) {
      case 'en':
      return "Active"
      case 'fr':
      return "Actif"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label156(language) {
  switch (language) {
      case 'en':
      return "Inactive"
      case 'fr':
      return "Inactif"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label157(language) {
  switch (language) {
      case 'en':
      return "Owner"
      case 'fr':
      return "Admin"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label158(language) {
  switch (language) {
      case 'en':
      return "Member"
      case 'fr':
      return "Membre"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}


export function label159(language) {
  switch (language) {
      case 'en':
      return "Copied to clipboard"
      case 'fr':
      return "Copié"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label160(language) {
  switch (language) {
      case 'en':
      return "Copy"
      case 'fr':
      return "Copier"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label161(language) {
  switch (language) {
      case 'en':
      return "Share"
      case 'fr':
      return "Partager"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label162(language) {
  switch (language) {
      case 'en':
      return "Reveal"
      case 'fr':
      return "Révéler"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label163(language) {
  switch (language) {
      case 'en':
      return "Click on the words in the correct order:"
      case 'fr':
      return "Cliquez sur les mots dans le bon ordre:"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label164(language) {
  switch (language) {
      case 'en':
      return "There is no token available in the contract."
      case 'fr':
      return "Pas de token disponible"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label165(language) {
  switch (language) {
      case 'en':
      return "WELCOME TO TOGETHERS"
      case 'fr':
      return "BIENVENUE"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label166(language) {
  switch (language) {
      case 'en':
      return "The safe, easy, private crypto social network"
      case 'fr':
      return "Dans le réseau social TOGETHERS"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label167(language) {
  switch (language) {
      case 'en':
      return 'No demander'
      case 'fr':
      return "Aucune demande"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label168(language) {
  switch (language) {
      case 'en':
      return 'Select a user'
      case 'fr':
      return "Selectionner un nouveau membre"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label169(language) {
  switch (language) {
      case 'en':
      return 'You already are a member of this group'
      case 'fr':
      return "Vous êtes déjà membre de ce groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function label170(language) {
  switch (language) {
      case 'en':
      return 'This wallet is in the list already'
      case 'fr':
      return "Cette addresse est déja dans la liste"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

//

export function title1(language) {
  switch (language) {
      case 'en':
      return 'Login'
      case 'fr':
      return "Authentification"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title2(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title3(language) {
  switch (language) {
      case 'en':
      return 'Confirm'
      case 'fr':
      return "Confirmation"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title4(language) {
  switch (language) {
      case 'en':
      return 'Destination'
      case 'fr':
      return "Destinataire"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title5(language) {
  switch (language) {
      case 'en':
      return 'Add a friend'
      case 'fr':
      return "Ajouter un membre"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title6(language) {
  switch (language) {
      case 'en':
      return 'Add a group'
      case 'fr':
      return "Ajout d'un groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title7(language) {
  switch (language) {
      case 'en':
      return 'New Group'
      case 'fr':
      return "Nouveau groupe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title8(language) {
  switch (language) {
      case 'en':
      return 'Apply'
      case 'fr':
      return "Souscrire"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title9(language) {
  switch (language) {
      case 'en':
      return 'Choose language'
      case 'fr':
      return "Choisir langue"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title10(language) {
  switch (language) {
      case 'en':
      return 'Change password'
      case 'fr':
      return "Changer mot de passe"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title11(language) {
  switch (language) {
      case 'en':
      return 'Change username'
      case 'fr':
      return "Changer pseudonyme"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title12(language) {
  switch (language) {
      case 'en':
      return 'Close demand'
      case 'fr':
      return "Fermer cagnotte"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title13(language) {
  switch (language) {
      case 'en':
      return 'Open demand'
      case 'fr':
      return "Ouvrir cagnotte"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title14(language) {
  switch (language) {
      case 'en':
      return 'Confirm mnemonics'
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title15(language) {
  switch (language) {
      case 'en':
      return 'Create mnemonics'
      case 'fr':
      return "Créer mnemonics"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title16(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title17(language) {
  switch (language) {
      case 'en':
      return 'Load mnemonics'
      case 'fr':
      return "Importer mnemonics"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title18(language) {
  switch (language) {
      case 'en':
      return 'Create wallet'
      case 'fr':
      return "creer porte feuille"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title19(language) {
  switch (language) {
      case 'en':
      return 'New wallet'
      case 'fr':
      return "Nouveau porte feuille"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title20(language) {
  switch (language) {
      case 'en':
      return 'Crypto choice'
      case 'fr':
      return "Choisir crypto"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title21(language) {
  switch (language) {
      case 'en':
      return 'Confirm transaction'
      case 'fr':
      return "Confirmer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title22(language) {
  switch (language) {
      case 'en':
      return 'Confirm swap'
      case 'fr':
      return "Confirmer échange"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title23(language) {
  switch (language) {
      case 'en':
      return 'Historic'
      case 'fr':
      return "Historique"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title24(language) {
  switch (language) {
      case 'en':
      return 'Receive'
      case 'fr':
      return "Rcevoir"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title25(language) {
  switch (language) {
      case 'en':
      return 'Send'
      case 'fr':
      return "Envoyer"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title26(language) {
  switch (language) {
      case 'en':
      return 'Network'
      case 'fr':
      return "Reseau"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title27(language) {
  switch (language) {
      case 'en':
      return 'Change'
      case 'fr':
      return "Echange"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}

export function title28(language) {
  switch (language) {
      case 'en':
      return 'Settings'
      case 'fr':
      return "Options"
      case 'es':
      return ""
      case 'po':
      return ""
      case 'it':
      return ""
  }
}
