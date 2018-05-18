import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
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

  constructor(public storage:Storage, private navCtrl: NavController, public authProvider: AuthProvider, private formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
   
    this.localDbSimulated.forEach(ingresso => {
      this.storage.set(ingresso.id, ingresso);
      console.log(ingresso);
    });
    
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
