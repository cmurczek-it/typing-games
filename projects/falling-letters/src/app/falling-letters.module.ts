import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FallingCharacterComponent } from './falling-character/falling-character.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [ShellComponent, GameBoardComponent, FallingCharacterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    StoreModule.forRoot(fallingLetterReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [ShellComponent],
})
export class FallingLettersModule {}
