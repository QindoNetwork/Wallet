import { Languages as LanguagesService } from '@common/services';
import { languages as LanguagesStore } from '@common/stores';

export function selectActiveLanguage(language) {
    return LanguagesService.saveActiveLanguage(language)
        .then(() => LanguagesStore.setSelectedLanguage(language));
}

export function choosePseudonyme(language) {
  switch (language) {
      case 'en':
      return "Choose pseudonyme"
      case 'fr':
      return "Choisir pseudonyme"
  }
}
