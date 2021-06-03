import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
//import {Service} from '../service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage {

  public id: number;

  constructor(public activatedRoute: ActivatedRoute) {
    var varGet = this.activatedRoute.snapshot.paramMap.get('nomVariable');
  }

}
