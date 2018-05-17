import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() { }

  async logarUsuario(email:string, senha:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, senha);
  }

  logoutUsuario():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
      .then(()=>{
        let loggedOut = true;
        resolve(loggedOut);
      })
      .catch((error:any)=>{
        reject(error);
      });
    });
  }

}
