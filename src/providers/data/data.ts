import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataProvider {

  public storage:Storage;
  public ingressos:any;

  constructor() {
    console.log('Hello DataProvider Provider');
  }

  adicionar(id, ingresso){
    this.storage.set(id, ingresso);
  }

  async get(id):Promise<any>{
    return this.storage.get(id);
  }

}
