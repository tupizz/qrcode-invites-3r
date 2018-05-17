import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;
  private loginForm: FormGroup;

  constructor(private navCtrl: NavController, public authProvider: AuthProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.required]
    });
  }


  async login(): Promise<any> {
    if (!this.loginForm.valid) {
      console.log("error n valido");
    } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authProvider.logarUsuario(this.loginForm.value.email, this.loginForm.value.senha)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.push(TabsPage);
          });
        }, error => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Erro na autenticação',
            subTitle: `Você digitou email ou senha inválidos!`,
            buttons: ['Dismiss']
          });
          alert.present();
        });
    }
    
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
