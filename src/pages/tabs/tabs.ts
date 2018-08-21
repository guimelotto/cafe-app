import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { UserHistoryPage } from "../user-history/user-history";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  public tab1: any;
  public tab2: any;

  constructor() {
    this.tab1 = HomePage;
    this.tab2 = UserHistoryPage;
  }
}
