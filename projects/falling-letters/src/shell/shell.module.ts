import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [BrowserModule, ShellRoutingModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [],
  bootstrap: [ShellComponent],
})
export class ShellModule {}
