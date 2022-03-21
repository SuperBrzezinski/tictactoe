import { ChangeDetectionStrategy } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BtnDbService } from './btn-db.service';

export type State = 'beforeGame' | 'p1' | 'p2' | 'gameOverX' | 'gameOverY';
export interface Btn {
  x: number;
  y: number;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public state: State;

  stateListener$ = new Subject<State>();

  constructor(private btnsDbService: BtnDbService) {
    this.state = 'beforeGame';
    this.stateListener$.subscribe((state: State) => {
      this.state = state;
    });
  }

  isGameOver(mark: 'X' | 'O') {
    let winCountX = 0;
    let winCountY = 0;
    let winCountXY = 0;
    let winCountYX = 0;
    for (let i = -1; i <= 1; i++) {
      this.btnsDbService.btnsDB.forEach((Btn) => {
        if (Btn.x === i && Btn.value === mark) winCountX++;
        if (Btn.y === i && Btn.value === mark) winCountY++;
        if (((Btn.x === -1 && Btn.y === 1) || (Btn.x === 0 && Btn.y === 0) || (Btn.x === 1 && Btn.y === -1)) && Btn.value === mark) winCountXY++;
        if (((Btn.x === 1 && Btn.y === 1) || (Btn.x === 0 && Btn.y === 0) || (Btn.x === -1 && Btn.y === -1)) && Btn.value === mark) winCountYX++;
      });
      if (winCountX === 3 || winCountY === 3 || winCountXY === 3 || winCountYX === 3) {
        console.log(`wygrywa ${mark}`);
        this.stateListener$.next(mark === 'X' ? 'gameOverX' : 'gameOverY');
        break;
      } else {
        winCountX = 0;
        winCountY = 0;
        winCountXY = 0;
        winCountYX = 0;
      }
    }
  }
}
