import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page{

  term = "";
  Offre = [
    {
      id: '1',
      icone: "../assets/avatar/Strooper.png",
      titre: "Agent d'accueil polyvalent",
      name: 'VCI luxe sarl',
      ville: 'METZ'
    },
    {
      id: '2',
      icone: "../assets/avatar/chuwy.png",
      titre: 'Assistant Comptable H/F',
      name: 'SOLO sarl',
      ville: 'METZ'
    },
    {
      id: '3',
      icone: "../assets/avatar/Strooper.png",
      titre: 'Chargé de marketing',
      name: 'VCI luxe sarl',
      ville: 'METZ'
    },
    {
      id: '4',
      icone: "../assets/avatar/Yoda.png",
      titre: 'Auxiliaire de vie H/F',
      name: 'Petit-Fils',
      ville: 'METZ'
    },
    {
      id: '5',
      icone: "../assets/avatar/DarkV.png",
      titre: 'Conseiller en formation H/F',
      name: 'Ville de Metz',
      ville: 'METZ'
    }
  ]

  public id: number;

  constructor(public activatedRoute: ActivatedRoute) {
    var varGet = this.activatedRoute.snapshot.paramMap.get('nomVariable');
  }
}
