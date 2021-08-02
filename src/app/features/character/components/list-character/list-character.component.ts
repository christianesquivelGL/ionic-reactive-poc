import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss'],
})
export class ListCharacterComponent implements OnInit {
  @Input() list: Character[];
  @Output() addToFavoritesEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  addToFavorites(entry: Parse.Object) {
    this.addToFavoritesEmitter.emit(entry);
  }
}
