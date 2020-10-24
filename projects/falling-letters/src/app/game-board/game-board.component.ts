import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameService } from '../game-logic/game.service';

@Component({
  selector: 'tyg-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnDestroy, OnInit, AfterViewInit {
  constructor(private gameService: GameService) {}
  private onDestroy = new Subject<void>();
  score: number;
  minutes = 0;
  seconds = 0;
  character: string;
  charPositionY = 0;
  charPositionX: number;
  playButton: boolean;
  gameBoardHeight: number;

  @ViewChild('gameBoard', { static: true }) gameBoard: ElementRef<SVGSVGElement>;

  @HostListener('window:keydown', ['$event']) handleKeyDownEvent(event: KeyboardEvent): void {
    if (event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Control' && event.key !== 'AltGraph' && event.key !== 'Dead') {
      this.gameService.typeCharacter(event.key);
      this.charPositionY = 0;
    }
  }

  ngOnInit(): void {
    this.gameService.score$.pipe(takeUntil(this.onDestroy)).subscribe({ next: (score) => (this.score = score) });
    this.gameService.character$.pipe(takeUntil(this.onDestroy)).subscribe({ next: (char) => (this.character = char) });
  }

  ngAfterViewInit(): void {
    this.charPositionX = Math.round(this.gameBoard.nativeElement.getClientRects().item(0).width / 2);
    this.gameBoardHeight = this.gameBoard.nativeElement.getClientRects().item(0).height;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  play(): void {
    this.gameService.play().subscribe({
      next: (countdown) => {
        this.playButton = true;
        this.minutes = Math.floor(countdown / 60);
        this.seconds = countdown % 60;
        this.charPositionY += 20;
        if (this.gameBoardHeight - this.charPositionY <= 20) {
          this.gameService.dropCharacter();
          this.charPositionY = 0;
        }
      },
      complete: () => {
        this.playButton = false;
      },
    });
  }
}
