import { createAction, props } from '@ngrx/store';

export const playGame = createAction('[GameBoard] Play Game', props<{ hits: number; misses: number; score: number; character: string }>());
export const typeCharacter = createAction(
  '[GameBoard] Type Character',
  props<{ isHit: boolean; scoreDelta: number; nextCharacter: string }>()
);
export const dropCharacter = createAction('[GameBoard] Drop Character', props<{ scoreDelta: number; nextCharacter: string }>());
