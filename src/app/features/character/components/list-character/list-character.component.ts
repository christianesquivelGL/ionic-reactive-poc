import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss'],
})
export class ListCharacterComponent implements OnInit {
  @Input() list: Parse.Object[];

  constructor() {}

  ngOnInit(): void {}
}
