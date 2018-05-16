import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public ingressos = new Array<any>();

  constructor(public navCtrl: NavController, private storage:Storage) {
    this.storage.forEach(v => {this.ingressos.push(v); console.log(v)});
  }

  atualizar(){
    this.ingressos = [];
    this.storage.forEach(v => {this.ingressos.push(v); console.log(v)});
  }

}

