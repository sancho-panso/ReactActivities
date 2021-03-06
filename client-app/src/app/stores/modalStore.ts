import {RootStore} from './rootStore';
import {action, makeAutoObservable, observable} from "mobx";



export default class ModalStore {

    rootStore: RootStore;
    constructor(rootStore:RootStore) {
      this.rootStore = rootStore
      makeAutoObservable(this);
    }

    @observable.shallow modal = {
        open:false,
        body:null
    }

    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}