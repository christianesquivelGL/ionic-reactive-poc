import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss'],
})
export class ListCharacterComponent implements OnInit {
  @Input() list: Character[];
  @Output() toggleAddToFavoritesEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  toggleAddToFavorites(entry: Parse.Object) {
    this.toggleAddToFavoritesEmitter.emit(entry);
  }
}
