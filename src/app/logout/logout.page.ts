import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {Service} from '../service';

import {
  ToastController,
  LoadingController,
  NavController,
  Platform
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {
  
  //By Driss As
  dataUser = {
    email: '',
    password: ''
  };
  connected: boolean;

  email = '';
  userId = '';
  method = '';
  //

  constructor(
    public router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.userId = auth.uid;
        this.email = auth.email;
        this.method = auth.providerData[0].providerId;
        this.connected = true;
      }
    });
  }

  public goToTab1(){
    this.router.navigate(['menu/profil']);
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }
}
