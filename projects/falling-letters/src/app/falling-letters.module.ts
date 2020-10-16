import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FallingLettersRoutingModule } from './falling-letters-routing.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [BrowserModule, FallingLettersRoutingModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [],
  bootstrap: [ShellComponent],
})
export class FallingLettersModule {}
