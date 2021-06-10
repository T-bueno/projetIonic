import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4-profile',
  templateUrl: './tab4-profile.page.html',
  styleUrls: ['./tab4-profile.page.scss'],
})
export class Tab4ProfilePage implements OnInit 
{
  userId: string;
  name: string;
  email: string;
  phone: string;



  constructor
  (
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() 
  {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    })
  }

  async updateProfile()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Updating..',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();

    this.afs.collection('user').doc(this.userId).set({
      'userName': this.name,
      'userEmail': this.email,
      'userPhone': this.phone,
      'editAt': Date.now()
    },{merge: true})
    .then(() => {
      loading.dismiss();
      this.toast('Update Success!', 'success');
      this.router.navigate(['/profile']);
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
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

  public goToLogOut(){
    this.router.navigate(['logout']);
  }

}
