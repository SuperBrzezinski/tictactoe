import { Component, OnInit } from '@angular/core';
import { BtnDbService } from '../btn-db.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(public stateService: StateService) {}

  ngOnInit(): void {}
}
