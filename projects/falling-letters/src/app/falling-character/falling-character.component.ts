import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[tyg-falling-character]',
  templateUrl: './falling-character.component.html',
  styleUrls: ['./falling-character.component.scss'],
})
export class FallingCharacterComponent {
  @Input() character: string;
  @Input() positionX: number;
  @Input() positionY: number;

  constructor() {}

}
