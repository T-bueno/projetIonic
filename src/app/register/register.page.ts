import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { Profil } from "../models/profil.model";
import { Router } from '@angular/router';


import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
//import { Profiler } from "inspector";
//import { waitForAsync } from "@angular/core/testing";


@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user = {} as User;
  profil = {} as Profil;

  constructor(
    public router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {}

  async register(user: User) {
    // console.log(user);

    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        // register user with email and password
        await this.afAuth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);

            // redirect to home page
            this.navCtrl.navigateRoot("home");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      // dismis loader
      loader.dismiss();
    }
  }

  async createProfil(profil: Profil){
    //console.log(profile);

    if (this.formValidation()){
      //console.log("ready to submit");

      //show loader

      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        await this.firestore.collection("profil").add(profil);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      // show toast message
      this.showToast("Entrez un email");
      return false;
    }

    if (!this.user.password) {
      // show toast message
      this.showToast("Entrez un mot de passe");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}