import { Component } from "@angular/core";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: "page-user-history",
  templateUrl: "user-history.html"
})
export class UserHistoryPage {
  public history;

  constructor(private _data: DataProvider) {}

  ionViewDidLoad() {
    this.history = this._data.userHistory;
  }
}
