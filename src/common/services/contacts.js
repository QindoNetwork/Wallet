import * as StorageService from './storage';
import { Contact } from '@common/constants';

export function loadContacts() {
    return StorageService.getItem(Contact.RATE_STORAGE_KEY);
}

export function saveContact(contacts) {
    return StorageService.setItem(Contact.RATE_STORAGE_KEY, contacts);
}
