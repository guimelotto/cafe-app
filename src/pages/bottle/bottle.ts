import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: "page-bottle",
  templateUrl: "bottle.html"
})
export class BottlePage {
  public haveCoffee: boolean;
  public currentBottle: any;
  // public bottles: any;
  public drinkers: any;
  public askers: any;

  constructor(private _navCtrl: NavController, private _data: DataProvider) {}

  ionViewDidLoad() {
    this._data.currentBottle.subscribe(data => {
      if (data) {
        this.currentBottle = this._data.currentBottle;
        this.haveCoffee = true;
      } else this.haveCoffee = false;
    });

    // this.bottles = this._data.bottles;
    this.drinkers = this._data.currentBottleDrinkers;
    this.askers = this._data.askers;
  }

  startBottle() {
    this._data.startCurrentBottle().then(() => (this.haveCoffee = true));
  }

  finishBottle() {
    this._data.finishCurrentBottle();
  }

  returnLanding() {
    this._navCtrl.pop();
  }
}
