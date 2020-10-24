import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, from, timer, BehaviorSubject, Observable, SchedulerLike, Subject } from 'rxjs';
import { mapTo, scan, take, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  private onDestroy = new Subject<void>();
  private onCharacter = new BehaviorSubject<string>('');
  private onScore = new BehaviorSubject<number>(0);

  character$ = this.onCharacter.asObservable();
  score$ = this.onScore.asObservable();

  constructor() {}

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onCharacter.complete();
    this.onScore.complete();
  }

  play(millis = 60 * 1000, interval = 1000, scheduler?: SchedulerLike): Observable<number> {
    this.onScore.next(0);
    this.onCharacter.next(this.nextRandomCharacter());
    const seconds = Math.round(millis / 1000);
    return timer(0, interval, scheduler).pipe(
      take(seconds + 1),
      mapTo(1),
      scan((countdown, one) => {
        return countdown - one;
      }, seconds + 1)
    );
  }

  typeCharacter(character: string): void {
    combineLatest([
      from(character).pipe(withLatestFrom(this.character$, (typedChar, fallingChar) => typedChar === fallingChar)),
      this.score$.pipe(take(1)),
    ]).subscribe({
      next: ([isHit, score]) => {
        if (isHit) {
          this.onScore.next(score + 5);
        } else {
          this.onScore.next(score - 3);
        }
        this.onCharacter.next(this.nextRandomCharacter());
      },
    });
  }

  dropCharacter(): void {
    this.score$.pipe(take(1)).subscribe({
      next: (score) => {
        this.onScore.next(score - 3);
        this.onCharacter.next(this.nextRandomCharacter());
      },
    });
  }

  private qwertzDe = () => {
    const keyboardChars: string[] = [];
    for (let index = 33; index < 127; index++) {
      keyboardChars.push(String.fromCharCode(index));
    }
    keyboardChars.push(String.fromCharCode(167)); // §
    keyboardChars.push(String.fromCharCode(176)); // °
    keyboardChars.push(String.fromCharCode(178)); // ²
    keyboardChars.push(String.fromCharCode(179)); // ³
    keyboardChars.push(String.fromCharCode(180)); // ´
    keyboardChars.push(String.fromCharCode(181)); // µ
    keyboardChars.push(String.fromCharCode(196)); // Ä
    keyboardChars.push(String.fromCharCode(214)); // Ö
    keyboardChars.push(String.fromCharCode(220)); // Ü
    keyboardChars.push(String.fromCharCode(223)); // ß
    keyboardChars.push(String.fromCharCode(228)); // ä
    keyboardChars.push(String.fromCharCode(246)); // ö
    keyboardChars.push(String.fromCharCode(252)); // ü
    keyboardChars.push(String.fromCharCode(8364)); // €
    return keyboardChars;
  };

  private nextRandomCharacter(): string {
    const chars = this.qwertzDe();
    return chars[Math.floor(Math.random() * chars.length + 1)];
  }
}
