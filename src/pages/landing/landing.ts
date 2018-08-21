import { Component } from "@angular/core";
import { NavController, AlertController, ToastController } from "ionic-angular";

import { BottlePage } from "../bottle/bottle";
import { DataProvider } from "../../providers/data/data";
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: "page-landing",
  templateUrl: "landing.html"
})
export class LandingPage {
  constructor(
    private _navCtrl: NavController,
    private _data: DataProvider,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController
  ) {}

  public doLogin() {
    this._data.doLogin().then(data => {
      console.log("logdata", data);
      if (data)
        this._navCtrl.setRoot(
          TabsPage,
          {},
          { animate: true, direction: "forward" }
        );
    });
  }

  public isBottleApp() {
    let alert = this._alertCtrl.create({
      title: "Sou mesmo de uma garrafa?!",
      subTitle: "Se sou, insira abaixo a palavra mágica das garrafas de café",
      inputs: [
        {
          name: "password",
          placeholder: "Palavra mágica",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Você não é de uma garrafa",
          role: "cancel"
        },
        {
          text: "Ativar modo garrafa",
          handler: form => {
            let config = this._data.configuration.subscribe((data: any) => {
              if (data.bottlePassword == form.password)
                this._navCtrl.push(BottlePage);
              else
                this.errorToast();
              config.unsubscribe();
              });
          }
        }
      ]
    });
    alert.present();
  }

  private errorToast() {
    this._toastCtrl
      .create({
        message: "Essa não é a palavra secreta das garrafas de café!",
        duration: 3000,
        position: "top"
      })
      .present();
  }
}
