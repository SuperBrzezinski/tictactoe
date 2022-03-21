import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Btn } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class BtnDbService {
  public btnsDB: Btn[];
  btnsClear$ = new Subject<'bang'>();
  constructor() {
    this.btnsDB = [];
  }
}
