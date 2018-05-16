import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qrData = null;
  scannedCode = null;

  private localDbSimulated:any = [
    {
      id:'85xb5y8f33r',
      nome:'Tadeu Humberto dos Reis',
      lote:'SEGUNDO',
      valor:'45',
      entrou: 'false'
    },
    {
      id:'3uk3js1p13r',
      nome:'Rafael Rocha de Azevedo',
      lote:'PRIMEIRO',
      valor:'30',
      entrou: 'false'
    },
    {
      id:'ruc32xa8o3r',
      nome:'Latonya Ligaya',
      lote:'TERCEIRO',
      valor:'45',
      entrou: 'false'
    },
    {
      id:'3koltu4jk3r',
      nome:'Chidimma Plouton',
      lote:'TERCEIRO',
      valor:'55',
      entrou: 'false'
    },
    {
      id:'rxuep2gtp3r',
      nome:'Tadeu Humberto dos Reis',
      lote:'SEGUNDO',
      valor:'45',
      entrou: 'false'
    },
    {
      id:'i4ab9d3y33r',
      nome:'Rosa Drest',
      lote:'SEGUNDO',
      valor:'45',
      entrou: 'false'
    },
    {
      id:'oxw7ac6ny3r',
      nome:'Mumin Reshmi',
      lote:'SEGUNDO',
      valor:'45',
      entrou: 'false'
    }
  ];

  constructor(public navCtrl: NavController, private barCodeScanner:BarcodeScanner, private storage:Storage, private alertCtrl:AlertController) {
    this.localDbSimulated.forEach(element => {
      this.storage.set(element.id,element);
      console.log(element);
    });
  }

 

  scanCode(){
    this.barCodeScanner.scan().then(result =>{
      let qrCode = result.text;
      this.storage.get(qrCode).then(ingresso => {
        if(ingresso.entrou){
          console.log("já entrou");
        }
        let alert = this.alertCtrl.create({
          title: 'Ingresso',
          message: 'Confirma a entrada desse ingresso?',
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
                ingresso.entrou=true;
                this.storage.set(ingresso.id,ingresso);
              }
            }
          ]
        });
        alert.present();
      });
      
    });
  }

}
