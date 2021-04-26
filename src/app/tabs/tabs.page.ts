import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {

  public id: number;

  constructor(public activatedRoute: ActivatedRoute) {
    var varGet = this.activatedRoute.snapshot.paramMap.get('nomVariable');
  }

}
