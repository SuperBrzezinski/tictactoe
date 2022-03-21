import { Component, Input, OnInit } from '@angular/core';
import { BtnDbService } from '../btn-db.service';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public dataX!: number;
  @Input() public dataY!: number;
  @Input() public dataZ!: number;
  public btnValue: string = '.';

  public isClicked: boolean = false;
  public disabled: boolean = false;

  constructor(private stateService: StateService, private btnsDbService: BtnDbService) {}

  ngOnInit(): void {
    this.btnsDbService.btnsDB.push({ x: this.dataX, y: this.dataY, value: this.btnValue });
    this.stateService.stateListener$.subscribe((state) => {
      this.disabled = state === 'p1' || state === 'p2' ? false : true;
    });
    this.btnsDbService.btnsClear$.subscribe(() => {
      this.btnValue = '.';
      this.isClicked = false;
      this.dbUpdate();
    });
  }

  choose() {
    if (!this.isClicked) {
      this.isClicked = true;

      if (this.stateService.state === 'p1') {
        this.btnValue = 'X';
        this.stateService.stateListener$.next('p2');
      } else {
        this.btnValue = 'O';
        this.stateService.stateListener$.next('p1');
      }
      this.dbUpdate();
      this.stateService.isGameOver('X');
      this.stateService.isGameOver('O');
      console.log(this.btnsDbService.btnsDB);
    }
  }

  dbUpdate() {
    for (let i = 0; i < this.btnsDbService.btnsDB.length; i++) {
      if (this.btnsDbService.btnsDB[i].x === this.dataX && this.btnsDbService.btnsDB[i].y === this.dataY) {
        this.btnsDbService.btnsDB[i].value = this.btnValue;
      }
    }
  }
}
