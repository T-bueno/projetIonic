import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Service} from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {}

  public goToTab1(){
    this.router.navigate(['tab1']);
  }
}
