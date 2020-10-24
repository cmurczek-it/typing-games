import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[tyg-falling-character]',
  templateUrl: './falling-character.component.html',
  styleUrls: ['./falling-character.component.scss'],
})
export class FallingCharacterComponent implements OnInit {
  @Input() character: string;
  @Input() positionX: number;
  @Input() positionY: number;

  constructor() {}

  ngOnInit(): void {}
}
