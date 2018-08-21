import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { GooglePlus } from "@ionic-native/google-plus";

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { MyApp } from "./app.component";

import { LandingPage } from "../pages/landing/landing";
import { BottlePage } from "../pages/bottle/bottle";
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { UserHistoryPage } from "../pages/user-history/user-history";
import { BottleHistoryPage } from "../pages/bottle-history/bottle-history";

import { DataProvider } from "../providers/data/data";
import { Reverse } from "../pipes/Reverse.pipe";

import constants from "./app.constants";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    BottlePage,
    TabsPage,
    UserHistoryPage,
    BottleHistoryPage,
    Reverse
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(constants.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    BottlePage,
    TabsPage,
    UserHistoryPage,
    BottleHistoryPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider
  ]
})
export class AppModule {}
