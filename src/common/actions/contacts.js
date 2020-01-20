import { contacts as ContactsStore} from '@common/stores';
import { Contacts as ContactsServices } from '@common/services';

export async function addContact(name, address) {
    ContactsStore.isLoading(true);
    ContactsStore.addContact(address,name);
    ContactsStore.isLoading(false);
}

export async function selectContact(contact) {
    ContactsStore.select(contact);
}

export function loadContact() {
    return ContactsServices.loadContacts()
}
