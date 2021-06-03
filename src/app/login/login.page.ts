import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
// After Driss As
import { Router } from '@angular/router';
//
import {
  ToastController,
  LoadingController,
  NavController,
  Platform
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;
  subscription: any;


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

  ngOnInit() {}

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }
  
  async login(user: User) {
    // console.log(user);

    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        // login user with email and password
        await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
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
  

 //By Driss AS
 /*
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
     this.dataUser = {
       email: '',
       password: ''
     };
  }
  */

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
 }

 public goToTab1(){
  this.router.navigate(['menu']);
}


  
  //

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
}