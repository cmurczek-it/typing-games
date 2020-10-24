import { BehaviorSubject, Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { autoSpy } from '../../testing';
import { SpyOf } from '../../testing/auto-spy';
import { GameService } from '../game-logic/game.service';
import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  it(
    'should create and destroy',
    marbles((m) => {
      const { component, gameServiceSpy } = setup().default().build();
      component.ngOnInit();
      expect(component).toBeTruthy();
      component.ngOnDestroy();
      m.expect(gameServiceSpy.score$).toBeObservable(m.cold('s', { s: 0 }));
    })
  );

  it(
    'should start a new game',
    marbles((m) => {
      const mockTimer = m.cold('t|', { t: 90 });
      const { component, gameServiceSpy } = setup().default().setTimer(mockTimer).build();
      component.ngOnInit();
      component.play();
      expect(gameServiceSpy.play).toHaveBeenCalled();
      m.expect(mockTimer).toBeObservable('t|', { t: 90 });
      m.scheduler.flush();
      expect(component.minutes).toBe(1);
      expect(component.seconds).toBe(30);
      component.ngOnDestroy();
    })
  );

  it('should process keyboard inputs', () => {
    const { component, gameServiceSpy } = setup().default().build();
    component.ngOnInit();
    component.handleKeyDownEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(gameServiceSpy.typeCharacter).toHaveBeenCalledWith('a');
    component.ngOnDestroy();
  });
});

interface TestSetupBuilder {
  default(): TestSetupBuilder;
  setTimer(observable: Observable<number>): TestSetupBuilder;
  build(): { component: GameBoardComponent; gameServiceSpy: SpyOf<GameService> };
}

function setup(): TestSetupBuilder {
  const gameService = autoSpy(GameService);
  const setScore = new BehaviorSubject<number>(0);
  const setCharacter = new BehaviorSubject<string>('');
  const builder = {
    default(): TestSetupBuilder {
      gameService.score$ = setScore.asObservable();
      gameService.character$ = setCharacter.asObservable();
      return builder;
    },
    setTimer(observable: Observable<number>): TestSetupBuilder {
      gameService.play.mockReturnValue(observable);
      return builder;
    },
    build(): { component: GameBoardComponent; gameServiceSpy: SpyOf<GameService> } {
      const component = new GameBoardComponent(gameService);
      component.gameBoardHeight = 800;
      return { component, gameServiceSpy: gameService };
    },
  };
  return builder;
}
