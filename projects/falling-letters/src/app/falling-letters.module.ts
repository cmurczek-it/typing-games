import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { FallingCharacterComponent } from './falling-character/falling-character.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [ShellComponent, GameBoardComponent, FallingCharacterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [],
  bootstrap: [ShellComponent],
})
export class FallingLettersModule {}
