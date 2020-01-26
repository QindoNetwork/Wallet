import * as StorageService from './storage';
import { Languages } from '@common/constants';

export function loadActiveLanguage() {
    return StorageService.getItem(Languages.LANGUAGE_STORAGE_KEY);
}

export function saveActiveLanguage(activeLanguage) {
    return StorageService.setItem(Languages.LANGUAGE_STORAGE_KEY, activeLanguage);
}
