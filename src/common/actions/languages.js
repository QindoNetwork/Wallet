import { Languages as LanguagesService } from '@common/services';
import { languages as LanguagesStore } from '@common/stores';

export function selectActiveLAnguage(language) {
    return LanguagesService.saveActiveLanguage(language)
        .then(() => LanguagesStore.setSelectedLanguage(language));
}

export function choosePseudonyme() {
  const language = LanguagesService.loadActiveLanguages()
  let label = ""
  switch (language) {
      case 'en':
      label = "Choose pseudonyme"
      break
      case 'fr':
      label = "Choisir pseudonyme"
      break
      default:
      label = "Choose pseudonyme"
      break
  }
  return label
}
