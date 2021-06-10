import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

//ENVIRONMENT
import { environment } from '../environments/environment.prod';

//AUTH SERVICE
import { AuthService } from './services/auth.service';

//AUTH GUARD
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG), //firebaseConfig
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
    ],
  providers: [
    //StatusBar,
    //SplashScreen,
    AuthService,
    AuthGuard,
    { 
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
