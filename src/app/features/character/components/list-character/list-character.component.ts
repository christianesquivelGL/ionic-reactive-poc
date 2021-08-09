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
    // NOTE: Liskov substitution
    // I manage the entry as a Parse.Object because I don't need to access properties from the subclass Character.
    // I could manage this entry as:
    // entry as Character if I need a specific property from the child.
    this.toggleAddToFavoritesEmitter.emit(entry);
  }
}
