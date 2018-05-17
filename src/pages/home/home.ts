import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { AboutPage } from '../about/about';
import { DataProvider } from '../../providers/data/data';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qrData = null;
  scannedCode = null;



  constructor(public app: App, public navCtrl: NavController, private dataProvider: DataProvider, private authProvider: AuthProvider, private barCodeScanner: BarcodeScanner, private storage: Storage, private alertCtrl: AlertController) {

  }

  logout(): void {
    this.authProvider.logoutUsuario()
      .then(isLoggedOut => {
        this.app.getRootNav().setRoot(LoginPage);
      }).catch((error: any) => {
        console.log(error);
      });
  }

  scanCode() {
    this.barCodeScanner.scan().then(result => {
      let qrCode = result.text;
      this.dataProvider.get(qrCode).then(ingresso => {
        if (ingresso.entrou === true) {
          let alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: `Usuário já entrou no evento`,
            buttons: ['Dismiss']
          });
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ingresso',
            message: `Confirma a entrada do ${ingresso.nome} de id #${ingresso.id}?`,
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Confirmar',
                handler: () => {

                  ingresso.entrou = true;
                  this.storage.set(ingresso.id, ingresso);
                  this.navCtrl.push(AboutPage);
                }
              }
            ]
          });
          alert.present();
        }
      });

    });
  }

}
