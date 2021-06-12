import { Component, OnInit } from "@angular/core";
import {Entreprise} from "../models/entreprise.model";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  LoadingController,
  ToastController,
  NavController
} from "@ionic/angular";


@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.page.html',
  styleUrls: ['./detail-offer.page.scss'],
})
export class DetailOfferPage implements OnInit {

  entreprise = {} as Entreprise;
  id: any;

  constructor(
    private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    // console.log(this.id);

    this.getEntrepriseById(this.id);
  }

  async getEntrepriseById(id: string) {
    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    this.firestore
      .doc('entreprise/' + id)
      .valueChanges()
      .subscribe(data => {
        this.entreprise.poste = data['poste'];
        this.entreprise.adresse = data['adresse'];
        this.entreprise.nom = data['nom'];
        this.entreprise.photo = data['photo'];
        this.entreprise.codepostal = data['code_postal'];
        this.entreprise.description = data['description'].replaceAll("_b","\n");

        // dismiss loader
        loader.dismiss();
      });
  }

  async updatePost(entreprise: Entreprise) {
    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        await this.firestore.doc("entreprise/" + this.id).update(entreprise);
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
    if (!this.entreprise.poste) {
      // show toast message
      this.showToast("Enter title");
      return false;
    }

    if (!this.entreprise.adresse) {
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
}
