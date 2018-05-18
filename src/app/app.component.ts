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

 

  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(FIREBASE_CONFIG);
    const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {        
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
