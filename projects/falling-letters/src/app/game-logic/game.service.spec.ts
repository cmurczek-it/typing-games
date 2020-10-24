import { marbles } from 'rxjs-marbles';
import { GameService } from './game.service';

describe('FallingLetter.FacadeService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'starts a new game',
    marbles((m) => {
      const scheduler = m.scheduler;
      const countdown = service.play(2000, 1, scheduler);
      m.expect(service.score$).toBeObservable(m.cold('p', { p: 0 }));
      m.expect(countdown).toBeObservable(m.cold('to(z|)', { t: 2, o: 1, z: 0 }));
    })
  );

  it(
    'scores a correct input and emits a new char',
    marbles((m) => {
      const characters: string[] = [];
      const sub = service.character$.subscribe({ next: (char) => characters.push(char) });
      service.play();
      service.typeCharacter(characters[1]);
      m.expect(service.score$).toBeObservable(m.cold('s', { s: 5 }));
      expect(characters.length).toBe(3);
      sub.unsubscribe();
    })
  );

  it(
    'scores an incorrect input and emits a new character',
    marbles((m) => {
      const characters: string[] = [];
      const sub = service.character$.subscribe({ next: (char) => characters.push(char) });
      service.play();
      service.typeCharacter(' ');
      m.expect(service.score$).toBeObservable(m.cold('s', { s: -3 }));
      expect(characters.length).toBe(3);
      sub.unsubscribe();
    })
  );

  it(
    'scores a non-input when the character is dropped and emits a new char',
    marbles((m) => {
      const characters: string[] = [];
      const sub = service.character$.subscribe({ next: (char) => characters.push(char) });
      service.play();
      service.dropCharacter();
      m.expect(service.score$).toBeObservable(m.cold('s', { s: -3 }));
      expect(characters.length).toBe(3);
      sub.unsubscribe();
    })
  );
});
