import { Component } from "@angular/core";
import { App } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { LandingPage } from "../landing/landing";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public currentBottle: any;
  public drinkSizes: { uid; size }[] = [
    { uid: 1, size: "50ml" },
    { uid: 2, size: "150ml" },
    { uid: 3, size: "300ml" },
    { uid: 4, size: "500ml" }
  ];

  constructor(private _app: App, private _data: DataProvider) {}

  ionViewDidLoad() {
    this._data.currentBottle.subscribe(data => (this.currentBottle = data));
  }

  drinkCoffee(size: { uid; size }) {
    this._data.drinkCoffee(size);
  }

  askForCoffee() {
    this._data.askForCoffee();
  }

  logout() {
    this._data.doLogout().then(() => {
      this._app
        .getRootNavs()[0]
        .setRoot(LandingPage, {}, { animate: true, direction: "back" });
    });
  }
}
