import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent implements OnInit {
  constructor(public gameService: GameService) {}
  @Input() square: any;

  ngOnInit(): void {}

  changePlayer() {
    this.gameService.isGamerunning = true;
    if (this.gameService.isGamerunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayr;
      this.gameService.changePlayerTurn(this.square);
    }
  }
}
