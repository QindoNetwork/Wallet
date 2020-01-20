import { action, observable } from 'mobx';
import { ethers } from 'ethers';

const INITIAL = {
    list: [],
    loading: false
};

export class ContactStore {

    @observable list = INITIAL.list;
    @observable loading = INITIAL.loading;

    @action isLoading(state) {
        this.loading = Boolean(state);
    }

    @action addContact(address, name) {
        contact.name = name;
        contact.address = address;
        this.list.push(contact);
    }

    @action removeContact(contact) {
        this.list = this.list.filter(c => c.address !== contact.address);
    }

    @action reset() {
        this.list = INITIAL.list;
        this.loading = INITIAL.loading;
    }
}

export default new ContactStore();
