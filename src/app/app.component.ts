import { Component, OnInit } from '@angular/core';
import { StateService, State } from './state.service';
import { BtnDbService } from './btn-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public state: State = 'beforeGame';
  constructor(private stateService: StateService, private btnsDbService: BtnDbService) {}

  ngOnInit() {
    this.stateService.stateListener$.subscribe((state) => (this.state = state));
  }

  startGame() {
    this.btnsDbService.btnsClear$.next('bang');
    this.stateService.stateListener$.next('p1');
  }
}
