import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {

  public idUser:number;
  public connect = false; 

  constructor() { }
}
