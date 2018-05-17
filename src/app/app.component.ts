import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { DataProvider } from '../providers/data/data';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';

import { FIREBASE_CONFIG } from './firebase.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  private localDbSimulated: any = [
    {
      id: '85xb5y8f33r',
      nome: 'Tadeu Humberto dos Reis',
      lote: 'SEGUNDO',
      valor: '45',
      entrou: 'false'
    },
    {
      id: '3uk3js1p13r',
      nome: 'Rafael Rocha de Azevedo',
      lote: 'PRIMEIRO',
      valor: '30',
      entrou: 'false'
    },
    {
      id: 'ruc32xa8o3r',
      nome: 'Henrique Neves',
      lote: 'TERCEIRO',
      valor: '45',
      entrou: 'false'
    },
    {
      id: '3koltu4jk3r',
      nome: 'José Carlos Freitas',
      lote: 'TERCEIRO',
      valor: '55',
      entrou: 'false'
    },
    {
      id: 'i4ab9d3y33r',
      nome: 'André Delorme',
      lote: 'SEGUNDO',
      valor: '45',
      entrou: 'false'
    },
    {
      id: 'oxw7ac6ny3r',
      nome: 'Mumin Reshmi',
      lote: 'SEGUNDO',
      valor: '45',
      entrou: 'false'
    }
  ];


  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dataProvider:DataProvider, storage:Storage) {
    firebase.initializeApp(FIREBASE_CONFIG);
    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      dataProvider.storage = storage;
      if (user) {

        this.localDbSimulated.forEach(ingresso => {
          dataProvider.adicionar(ingresso.id, ingresso);
          console.log(ingresso);
        });
        
        this.rootPage = TabsPage;
        unsubscribe();
      } else {
        this.rootPage = LoginPage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
