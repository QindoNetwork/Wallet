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
  }
}

export function label2(language) {
  switch (language) {
      case 'en':
      return "You already asked"
      case 'fr':
      return "Vous avez deja demandé"
  }
}

export function label3(language) {
  switch (language) {
      case 'en':
      return "This user did not ask to apply"
      case 'fr':
      return "Cet utilisateur n'a pas fait de demande"
  }
}

export function label4(language) {
  switch (language) {
      case 'en':
      return "Is member already"
      case 'fr':
      return "Ce membre fait déja pati du groupe"
  }
}

export function label5(language) {
  switch (language) {
      case 'en':
      return 'Password not good'
      case 'fr':
      return "Mauvais mot de passe"
  }
}

export function label6(language) {
  switch (language) {
      case 'en':
      return 'Username unavailable'
      case 'fr':
      return "Pseudonyme non disponible"
  }
}

export function label7(language) {
  switch (language) {
      case 'en':
      return "The user have to close his demand"
      case 'fr':
      return "L'utilisateur doit d'abord fermer sa cagnotte"
  }
}

export function label8(language) {
  switch (language) {
      case 'en':
      return "Create a new group"
      case 'fr':
      return "Créer un nouveau groupe"
  }
}

export function label9(language) {
  switch (language) {
      case 'en':
      return "Apply for an existing one"
      case 'fr':
      return "Entrer dans un groupe existant"
  }
}

export function label10(language) {
  switch (language) {
      case 'en':
      return "Destination address"
      case 'fr':
      return "Destinataire"
  }
}

export function label11(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continue"
  }
}

export function label12(language) {
  switch (language) {
      case 'en':
      return "Transfer ownership"
      case 'fr':
      return "Rendre administrateur"
  }
}

export function label13(language) {
  switch (language) {
      case 'en':
      return "Remove user"
      case 'fr':
      return "Supprimer ce membre"
  }
}

export function label14(language) {
  switch (language) {
      case 'en':
      return "Group ID"
      case 'fr':
      return "Identifiant du groupe"
  }
}

export function label15(language) {
  switch (language) {
      case 'en':
      return "Apply"
      case 'fr':
      return "Demander"
  }
}

export function label16(language) {
  switch (language) {
      case 'en':
      return "Old password"
      case 'fr':
      return "Ancien mot de passe"
  }
}

export function label17(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
  }
}

export function label18(language) {
  switch (language) {
      case 'en':
      return "New password"
      case 'fr':
      return "Nouveau mot de passe"
  }
}

export function label19(language) {
  switch (language) {
      case 'en':
      return "Confirm password"
      case 'fr':
      return "Confirmer mot de passe"
  }
}

export function label20(language) {
  switch (language) {
      case 'en':
      return "New username"
      case 'fr':
      return "Nouveau pseudonyme"
  }
}

export function label21(language) {
  switch (language) {
      case 'en':
      return "Username"
      case 'fr':
      return "Pseudonyme"
  }
}

export function label22(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
  }
}

export function label23(language) {
  switch (language) {
      case 'en':
      return "Close"
      case 'fr':
      return "Fermer"
  }
}

export function label24(language) {
  switch (language) {
      case 'en':
      return "Uncorrect"
      case 'fr':
      return "Faux"
  }
}

export function label25(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continue"
  }
}

export function label26(language) {
  switch (language) {
      case 'en':
      return "Cancel"
      case 'fr':
      return "Annuler"
  }
}

export function label27(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
  }
}

export function label28(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continuer"
  }
}

export function label29(language) {
  switch (language) {
      case 'en':
      return "Cancel"
      case 'fr':
      return "Annuler"
  }
}

export function label30(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
  }
}

export function label31(language) {
  switch (language) {
      case 'en':
      return "Group name"
      case 'fr':
      return "Nom du groupe"
  }
}

export function label32(language) {
  switch (language) {
      case 'en':
      return "Create a new group"
      case 'fr':
      return "Nouveau groupe"
  }
}


export function label33(language) {
  switch (language) {
      case 'en':
      return "Save carefully your sequence of mnemonics"
      case 'fr':
      return "Concervez votre mnemonics avec prudence"
  }
}

export function label34(language) {
  switch (language) {
      case 'en':
      return "Proceed"
      case 'fr':
      return "Continuer"
  }
}

export function label35(language) {
  switch (language) {
      case 'en':
      return "When creating a new wallet you will receive a sequence of mnemonics which represent your personal password. Anyone with this sequence may be able to reconfigure your wallet in any new device. Keep it stored as secure as possible. Only you should have access to this information."
      case 'fr':
      return "Lorsque vous créez un nouveau porte feuille vous recevez votre mnemonic qui représente votre mot de passe personnel, concervez le de la manière la plus prudente possible"
  }
}

export function label36(language) {
  switch (language) {
      case 'en':
      return "Write it somewhere safe so you can make sure you won't lose it, or you may lose permanently all your coins. There is no way to recover it later."
      case 'fr':
      return "Ecrivez le quelque part ou vous ne le perderez pas sous rique de perdre vos coins"
  }
}

export function label37(language) {
  switch (language) {
      case 'en':
      return "Proceed"
      case 'fr':
      return "Continuer"
  }
}

export function label38(language) {
  switch (language) {
      case 'en':
      return "Groups"
      case 'fr':
      return "Groupes"
  }
}

export function label39(language) {
  switch (language) {
      case 'en':
      return "Add a group"
      case 'fr':
      return "Ajouter un groupe"
  }
}

export function label40(language) {
  switch (language) {
      case 'en':
      return "New wallet saved"
      case 'fr':
      return "Nouveau porte feuille créé"
  }
}

export function label41(language) {
  switch (language) {
      case 'en':
      return 'Type the mnemonic here in one line'
      case 'fr':
      return "Entrez le mnemonic en une seule ligne"
  }
}

export function label42(language) {
  switch (language) {
      case 'en':
      return "Open wallet"
      case 'fr':
      return "Ouvrir le porte feuille"
}
}

export function label43(language) {
  switch (language) {
      case 'en':
      return "Low balance, you need ether to register, show the code below to receive ethers and enter to the community!"
      case 'fr':
      return "Vous avez besoin d'ethers pour vous enregistrer, utilisez le qrCode"
  }
}

export function label44(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
  }
}

export function label45(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
  }
}

export function label46(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
  }
}

export function label47(language) {
  switch (language) {
      case 'en':
      return "Passwords not equals"
      case 'fr':
      return "Les mots de passe de correspondent pas"
  }
}

export function label48(language) {
  switch (language) {
      case 'en':
      return "This username already exists"
      case 'fr':
      return "Ce pseudonyme n'est pas disponible"
  }
}

export function label49(language) {
  switch (language) {
      case 'en':
      return "Password"
      case 'fr':
      return "Mot de passe"
  }
}

export function label50(language) {
  switch (language) {
      case 'en':
      return "Confirm password"
      case 'fr':
      return "Confirmer mot de passe"
  }
}

export function label51(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
  }
}

export function label52(language) {
  switch (language) {
      case 'en':
      return "Approximatly"
      case 'fr':
      return "Environ"
  }
}

export function label53(language) {
  switch (language) {
      case 'en':
      return "Username"
      case 'fr':
      return "Pseudonyme"
  }
}

export function label54(language) {
  switch (language) {
      case 'en':
      return "Do you already have a wallet to configure?"
      case 'fr':
      return "Avez vous déja un porte feuille à importer?"
  }
}

export function label55(language) {
  switch (language) {
      case 'en':
      return "Yes, load it"
      case 'fr':
      return "Oui, importer"
  }
}

export function label56(language) {
  switch (language) {
      case 'en':
      return "No, create new"
      case 'fr':
      return "Non, créer un nouveau"
  }
}

export function label57(language) {
  switch (language) {
      case 'en':
      return "User unavailable"
      case 'fr':
      return "Pseudonyme indisponible"
  }
}


export function label58(language) {
  switch (language) {
      case 'en':
      return "Choose your pseudonyme"
      case 'fr':
      return "Choisir un pseudonyme"
  }
}

export function label59(language) {
  switch (language) {
      case 'en':
      return "Name"
      case 'fr':
      return "Nom"
  }
}

export function label60(language) {
  switch (language) {
      case 'en':
      return "Next"
      case 'fr':
      return "Suivant"
  }
}

export function label61(language) {
  switch (language) {
      case 'en':
      return "Description"
      case 'fr':
      return "Description"
  }
}

export function label62(language) {
  switch (language) {
      case 'en':
      return "Demand"
      case 'fr':
      return "Demander"
  }
}

export function label63(language) {
  switch (language) {
      case 'en':
      return "Global stats"
      case 'fr':
      return "Statistiques"
  }
}

export function label64(language) {
  switch (language) {
      case 'en':
      return "Input"
      case 'fr':
      return "Entrant"
  }
}

export function label65(language) {
  switch (language) {
      case 'en':
      return "Send Cryptos"
      case 'fr':
      return "Envoyer"
  }
}

export function label66(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
  }
}

export function label67(language) {
  switch (language) {
      case 'en':
      return "Into"
      case 'fr':
      return "En"
  }
}

export function label68(language) {
  switch (language) {
      case 'en':
      return "Togethers balances"
      case 'fr':
      return "Togethers soldes"
  }
}

export function label69(language) {
  switch (language) {
      case 'en':
      return "Inbox"
      case 'fr':
      return "Dans la cagnotte"
  }
}

export function label70(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
  }
}

export function label71(language) {
  switch (language) {
      case 'en':
      return "Swap"
      case 'fr':
      return "Echanger"
  }
}

export function label72(language) {
  switch (language) {
      case 'en':
      return "Your balances"
      case 'fr':
      return "Vos soldes"
  }
}

export function label73(language) {
  switch (language) {
      case 'en':
      return "friends"
      case 'fr':
      return "amis"
  }
}

export function label74(language) {
  switch (language) {
      case 'en':
      return "Show the code below to receive coins"
      case 'fr':
      return "Montrer ce code pour recevoir des cryptos"
  }
}

export function label75(language) {
  switch (language) {
      case 'en':
      return "Destination address"
      case 'fr':
      return "Destination"
  }
}

export function label76(language) {
  switch (language) {
      case 'en':
      return "You don't have enough balance"
      case 'fr':
      return "Solde trop faible"
  }
}

export function label77(language) {
  switch (language) {
      case 'en':
      return "Continue"
      case 'fr':
      return "Continuer"
      default:
      return ""
  }
}

export function label78(language) {
  switch (language) {
      case 'en':
      return "You or contract don t have enough balance"
      case 'fr':
      return "Trop élevé"
  }
}

export function label79(language) {
  switch (language) {
      case 'en':
      return 'Erase wallets'
      case 'fr':
      return "Supprimer les portes feuilles"
      default:
      return ""
  }
}

export function label80(language) {
  switch (language) {
      case 'en':
      return 'This action cannot be undone. Are you sure?'
      case 'fr':
      return "Aucun retour arrière possible, ètes vous sur?"
  }
}

export function label81(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
  }
}

export function label82(language) {
  switch (language) {
      case 'en':
      return 'erase'
      case 'fr':
      return "effacer"
  }
}

export function label83(language) {
  switch (language) {
      case 'en':
      return 'Erase wallets'
      case 'fr':
      return "supprimer les portes feuilles"
  }
}

export function label84(language) {
  switch (language) {
      case 'en':
      return 'Change language'
      case 'fr':
      return "Changer de langue"
  }
}

export function label85(language) {
  switch (language) {
      case 'en':
      return 'Historic'
      case 'fr':
      return "Extrait"
  }
}

export function label86(language) {
  switch (language) {
      case 'en':
      return 'Receive'
      case 'fr':
      return "Recevoir"
  }
}

export function label87(language) {
  switch (language) {
      case 'en':
      return 'Send'
      case 'fr':
      return "Envoyer"
  }
}

export function label88(language) {
  switch (language) {
      case 'en':
      return 'Network'
      case 'fr':
      return "Réseau"
  }
}

export function label89(language) {
  switch (language) {
      case 'en':
      return 'Swap'
      case 'fr':
      return "Echanger"
  }
}

export function label90(language) {
  switch (language) {
      case 'en':
      return 'Settings'
      case 'fr':
      return "Options"
  }
}

export function label91(language) {
  switch (language) {
      case 'en':
      return 'There are still no transactions involving this wallet.'
      case 'fr':
      return "Aucune transaction"
  }
}

export function label92(language) {
  switch (language) {
      case 'en':
      return 'Yes'
      case 'fr':
      return "Oui"
  }
}

export function label93(language) {
  switch (language) {
      case 'en':
      return 'No'
      case 'fr':
      return "Non"
  }
}

export function label94(language) {
  switch (language) {
      case 'en':
      return 'Copied to clipboard'
      case 'fr':
      return "Copié"
  }
}

export function label95(language) {
  switch (language) {
      case 'en':
      return 'From'
      case 'fr':
      return "Depuis"
  }
}

export function label96(language) {
  switch (language) {
      case 'en':
      return 'To'
      case 'fr':
      return "Vers"
  }
}

export function label97(language) {
  switch (language) {
      case 'en':
      return 'Close'
      case 'fr':
      return "Fermer"
  }
}

export function label98(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
  }
}

export function label99(language) {
  switch (language) {
      case 'en':
      return 'Gas used'
      case 'fr':
      return "Gas utilisé"
  }
}

export function label100(language) {
  switch (language) {
      case 'en':
      return 'Error'
      case 'fr':
      return "Erreur"
  }
}

export function label101(language) {
  switch (language) {
      case 'en':
      return 'Transaction hash'
      case 'fr':
      return "Identifiant de la transaction"
  }
}

export function label102(language) {
  switch (language) {
      case 'en':
      return 'Copy'
      case 'fr':
      return "Copier"
  }
}

export function label103(language) {
  switch (language) {
      case 'en':
      return 'Remove wallet'
      case 'fr':
      return "Supprimer porte feuille"
  }
}

export function label104(language) {
  switch (language) {
      case 'en':
      return 'This action cannot be undone. Are you sure?'
      case 'fr':
      return "Ne peut être annulé, ètes vous sur?"
  }
}

export function label105(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
  }
}

export function label106(language) {
  switch (language) {
      case 'en':
      return 'Remove'
      case 'fr':
      return "Supprimer"
  }
}

export function label107(language) {
  switch (language) {
      case 'en':
      return 'Remove wallet'
      case 'fr':
      return "Supprimer porte feuille"
  }
}

export function label108(language) {
  switch (language) {
      case 'en':
      return 'Password'
      case 'fr':
      return "Mot de passe"
  }
}

export function label109(language) {
  switch (language) {
      case 'en':
      return 'User name'
      case 'fr':
      return "Pseudonyme"
  }
}

export function label110(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
  }
}

export function label111(language) {
  switch (language) {
      case 'en':
      return 'Unknown function'
      case 'fr':
      return "Fonction inconnue"
  }
}

export function label112(language) {
  switch (language) {
      case 'en':
      return 'Success, wait for confirmation in historic'
      case 'fr':
      return "OK, Attendez la confirmation dans l'historique"
  }
}

export function label113(language) {
  switch (language) {
      case 'en':
      return 'Low balance'
      case 'fr':
      return "Solde trop faible"
  }
}

export function label114(language) {
  switch (language) {
      case 'en':
      return 'Approximatly'
      case 'fr':
      return "Environ"
  }
}

export function label115(language) {
  switch (language) {
      case 'en':
      return 'Continue'
      case 'fr':
      return "Continuer"
  }
}

export function label116(language) {
  switch (language) {
      case 'en':
      return 'Cancel'
      case 'fr':
      return "Annuler"
  }
}

export function label117(language) {
  switch (language) {
      case 'en':
      return 'Password'
      case 'fr':
      return "Mot de passe"
  }
}

export function label118(language) {
  switch (language) {
      case 'en':
      return 'Enter password'
      case 'fr':
      return "Entrez mot de passe"
  }
}

export function label119(language) {
  switch (language) {
      case 'en':
      return 'You have to be administrator to add a member to the group'
      case 'fr':
      return "Vous devez ètre administrateur pour ajouter un membre a ce groupe"
  }
}

export function label120(language) {
  switch (language) {
      case 'en':
      return 'My demand'
      case 'fr':
      return "Ma cagnotte"
  }
}

export function label121(language) {
  switch (language) {
      case 'en':
      return 'Quit group'
      case 'fr':
      return "Quitter ce groupe"
  }
}

export function label122(language) {
  switch (language) {
      case 'en':
      return 'group'
      case 'fr':
      return "groupe"
  }
}

export function label123(language) {
  switch (language) {
      case 'en':
      return 'friend'
      case 'fr':
      return "ami"
  }
}

export function label124(language) {
  switch (language) {
      case 'en':
      return 'Unknown'
      case 'fr':
      return "Inconnu"
  }
}

export function label125(language) {
  switch (language) {
      case 'en':
      return 'Confirm'
      case 'fr':
      return "Confirmer"
  }
}

export function label126(language) {
  switch (language) {
      case 'en':
      return 'Enter Password'
      case 'fr':
      return "Entrer mot de passe"
  }
}

export function label127(language) {
  switch (language) {
      case 'en':
      return 'Password not good'
      case 'fr':
      return "Mauvais mot de passe"
  }
}

export function label128(language) {
  switch (language) {
      case 'en':
      return 'Success, wait for confirmation in historic'
      case 'fr':
      return "OK, attendre la confirmation dans l'historique"
  }
}

export function label129(language) {
  switch (language) {
      case 'en':
      return 'Wallet address'
      case 'fr':
      return "Addresse"
  }
}

export function label130(language) {
  switch (language) {
      case 'en':
      return 'Name'
      case 'fr':
      return "Nom"
  }
}

export function label131(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
  }
}

export function label132(language) {
  switch (language) {
      case 'en':
      return 'Wallet address'
      case 'fr':
      return "Addresse"
  }
}

export function label133(language) {
  switch (language) {
      case 'en':
      return 'Name'
      case 'fr':
      return "Nom"
  }
}

export function label134(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
  }
}

export function label135(language) {
  switch (language) {
      case 'en':
      return 'Group'
      case 'fr':
      return "Groupe"
  }
}

export function label136(language) {
  switch (language) {
      case 'en':
      return 'Confirm payment'
      case 'fr':
      return "Confirmer"
  }
}

export function label137(language) {
  switch (language) {
      case 'en':
      return "Confirm payment"
      case 'fr':
      return "Confirmer"
  }
}

export function label138(language) {
  switch (language) {
      case 'en':
      return "Confirm"
      case 'fr':
      return "Confirmer"
  }
}

export function label139(language) {
  switch (language) {
      case 'en':
      return "Enter Password"
      case 'fr':
      return "Entrer mot de passe"
  }
}

export function label140(language) {
  switch (language) {
      case 'en':
      return "Password not good"
      case 'fr':
      return "Mauvais mot de passe"
  }
}

export function label141(language) {
  switch (language) {
      case 'en':
      return "Success, wait for confirmation in historic"
      case 'fr':
      return "OK, attendre confirmation"
  }
}

export function label142(language) {
  switch (language) {
      case 'en':
      return "Wallet address"
      case 'fr':
      return "Addresse"
  }
}

export function label143(language) {
  switch (language) {
      case 'en':
      return "Amount"
      case 'fr':
      return "Montant"
  }
}

export function label144(language) {
  switch (language) {
      case 'en':
      return "Fees"
      case 'fr':
      return "Frais"
  }
}

export function label145(language) {
  switch (language) {
      case 'en':
      return "Confirm swap"
      case 'fr':
      return "Confirmer"
  }
}

export function label146(language) {
  switch (language) {
      case 'en':
      return "Confirm & open wallet"
      case 'fr':
      return "Confirmer"
  }
}

export function label147(language) {
  switch (language) {
      case 'en':
      return "Your donnation"
      case 'fr':
      return "Votre don actuel"
  }
}

export function label148(language) {
  switch (language) {
      case 'en':
      return "Amount"
      case 'fr':
      return "Montant"
  }
}

export function label149(language) {
  switch (language) {
      case 'en':
      return "Global stats"
      case 'fr':
      return "Statistiques"
  }
}

export function label150(language) {
  switch (language) {
      case 'en':
      return "Output"
      case 'fr':
      return "Sortant"
  }
}

export function label151(language) {
  switch (language) {
      case 'en':
      return "Inbox"
      case 'fr':
      return "Entrant"
  }
}

export function label152(language) {
  switch (language) {
      case 'en':
      return "Balances"
      case 'fr':
      return "Soldes"
  }
}

export function label153(language) {
  switch (language) {
      case 'en':
      return "Details"
      case 'fr':
      return "Details"
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
  }
}

export function label156(language) {
  switch (language) {
      case 'en':
      return "Inactive"
      case 'fr':
      return "Inactif"
  }
}

export function label157(language) {
  switch (language) {
      case 'en':
      return "Owner"
      case 'fr':
      return "Admin"
  }
}

export function label158(language) {
  switch (language) {
      case 'en':
      return "Member"
      case 'fr':
      return "Membre"
  }
}


export function label159(language) {
  switch (language) {
      case 'en':
      return "Copied to clipboard"
      case 'fr':
      return "Copié"
  }
}

export function label160(language) {
  switch (language) {
      case 'en':
      return "Copy"
      case 'fr':
      return "Copier"
  }
}

export function label161(language) {
  switch (language) {
      case 'en':
      return "Share"
      case 'fr':
      return "Partager"
  }
}

export function label162(language) {
  switch (language) {
      case 'en':
      return "Reveal"
      case 'fr':
      return "Révéler"
  }
}

export function label163(language) {
  switch (language) {
      case 'en':
      return "Click on the words in the correct order:"
      case 'fr':
      return "Cliquez sur les mots dans le bon ordre:"
  }
}

//

export function title1(language) {
  switch (language) {
      case 'en':
      return 'Login'
      case 'fr':
      return "Authentification"
  }
}

export function title2(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
  }
}

export function title3(language) {
  switch (language) {
      case 'en':
      return 'Confirm'
      case 'fr':
      return "Confirmation"
  }
}

export function title4(language) {
  switch (language) {
      case 'en':
      return 'Destination'
      case 'fr':
      return "Destinataire"
  }
}

export function title5(language) {
  switch (language) {
      case 'en':
      return 'Add a friend'
      case 'fr':
      return "Ajouter un membre"
  }
}

export function title6(language) {
  switch (language) {
      case 'en':
      return 'Add a group'
      case 'fr':
      return "Ajout d'un groupe"
  }
}

export function title7(language) {
  switch (language) {
      case 'en':
      return 'New Group'
      case 'fr':
      return "Nouveau groupe"
  }
}

export function title8(language) {
  switch (language) {
      case 'en':
      return 'Apply'
      case 'fr':
      return "Souscrire"
  }
}

export function title9(language) {
  switch (language) {
      case 'en':
      return 'Choose language'
      case 'fr':
      return "Choisir langue"
  }
}

export function title10(language) {
  switch (language) {
      case 'en':
      return 'Change password'
      case 'fr':
      return "Changer mot de passe"
  }
}

export function title11(language) {
  switch (language) {
      case 'en':
      return 'Change username'
      case 'fr':
      return "Changer pseudonyme"
  }
}

export function title12(language) {
  switch (language) {
      case 'en':
      return 'Close demand'
      case 'fr':
      return "Fermer cagnotte"
  }
}

export function title13(language) {
  switch (language) {
      case 'en':
      return 'Open demand'
      case 'fr':
      return "Ouvrir cagnotte"
  }
}

export function title14(language) {
  switch (language) {
      case 'en':
      return 'Confirm mnemonics'
      case 'fr':
      return "Confirmer"
  }
}

export function title15(language) {
  switch (language) {
      case 'en':
      return 'Create mnemonics'
      case 'fr':
      return "Créer mnemonics"
  }
}

export function title16(language) {
  switch (language) {
      case 'en':
      return 'Amount'
      case 'fr':
      return "Montant"
  }
}

export function title17(language) {
  switch (language) {
      case 'en':
      return 'Load mnemonics'
      case 'fr':
      return "Importer mnemonics"
  }
}

export function title18(language) {
  switch (language) {
      case 'en':
      return 'Create wallet'
      case 'fr':
      return "creer porte feuille"
  }
}

export function title19(language) {
  switch (language) {
      case 'en':
      return 'New wallet'
      case 'fr':
      return "Nouveau porte feuille"
  }
}

export function title20(language) {
  switch (language) {
      case 'en':
      return 'Crypto choice'
      case 'fr':
      return "Choisir crypto"
  }
}

export function title21(language) {
  switch (language) {
      case 'en':
      return 'Confirm transaction'
      case 'fr':
      return "Confirmer"
  }
}

export function title22(language) {
  switch (language) {
      case 'en':
      return 'Confirm swap'
      case 'fr':
      return "Confirmer échange"
  }
}
