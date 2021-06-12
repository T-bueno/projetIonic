import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  LoadingController,
  ToastController,
  NavController
} from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user";

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.page.html',
  styleUrls: ['./detail-offer.page.scss'],
})
export class DetailOfferPage implements OnInit {

  posts = {} as Post;
  user = {} as User;
  id: any;
  userId: string;
  poste: string;
  adresse: string;
  entreprise: string;
  posteId: string;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private actRoute: ActivatedRoute,
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private toastr: ToastController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    // console.log(this.id);

    this.getPostById(this.id);
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
    
    })
  }

  async getPostById(id: string) {
    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    this.firestore
      .doc("posts/" + id)
      .valueChanges()
      .subscribe(data => {
        this.posts.poste = data["poste"];
        this.posts.entreprise = data["entreprise"];
        this.posts.adresse = data["adresse"];
        this.posts.libelle_activite = data["libelle_activite"];
        this.posts.libelle_presentation = data["libelle_presentation"];
        this.posts.libelle_poste = data["libelle_poste"];
        this.posts.postId = data["posteId"];

        // dismiss loader
        loader.dismiss();
      });
  }

  async updatePost(post: Post) {
    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        await this.firestore.doc("posts/" + this.id).update(post);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      await loader.dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation() {
    if (!this.posts.poste) {
      // show toast message
      this.showToast("Enter title");
      return false;
    }

    if (!this.posts.entreprise) {
      // show toast message
      this.showToast("Enter details");
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

  async candidature()
  {

        const res = await this.afs.collection('candidature').add({
          poste: this.posts.poste,
          entreprise: this.posts.entreprise,
          adresse: this.posts.adresse,
          userId: this.userId,
          postId: this.id

    });
    
    console.log('Added document with ID: ', res.id);
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present();

  
}
}
