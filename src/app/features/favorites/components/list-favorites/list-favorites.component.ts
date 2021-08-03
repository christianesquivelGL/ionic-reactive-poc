import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.scss'],
})
export class ListFavoritesComponent {
  @Input() list: Parse.Object[];
  @Output() toggleAddToFavoritesEmitter = new EventEmitter<any>();

  toggleAddToFavorites(entry: Parse.Object) {
    this.toggleAddToFavoritesEmitter.emit(entry);
  }
}
