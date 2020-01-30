import { action, computed, observable } from 'mobx';
import { Languages as LanguagesConstants } from '@common/constants';

const INITIAL = {
    fr: 0,
    en: 0,
    selectedLanguage: 'en',
    loading: false
};

export class LanguageStore {

    @observable en = INITIAL.en;
    @observable fr = INITIAL.fr;
    @observable selectedLanguage = INITIAL.selectedLanguage;
    @observable loading = INITIAL.loading;

    @computed get selectedLanguageValue() {
        return this[this.selectedLanguage];
    }

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action setSelectedLanguage(language) {
        language = language || INITIAL.selectedLanguage;
        this.selectedLanguage = String(language);
    }

    @action reset() {
        this.en = INITIAL.en;
        this.fr = INITIAL.fr;
        this.selectedLanguage = INITIAL.selectedLanguage;
        this.loading = INITIAL.loading;
    }
}

export default new LanguageStore();
