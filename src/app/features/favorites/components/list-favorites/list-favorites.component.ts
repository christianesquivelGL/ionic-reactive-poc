import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.scss'],
})
export class ListFavoritesComponent {
  @Input() list: Parse.Object[];
}
