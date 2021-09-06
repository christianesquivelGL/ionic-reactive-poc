import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CharacterService } from 'src/app/providers/swapi/character.service';

import { Character } from '../../models/character.model';

@Component({
  selector: 'app-list-character',
  templateUrl: './list-character.component.html',
  styleUrls: ['./list-character.component.scss'],
})
export class ListCharacterComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() list: Character[];
  @Input() lastPage: boolean;

  @Output() toggleAddToFavoritesEmitter = new EventEmitter<any>();
  @Output() loadMoreEmitter = new EventEmitter<any>();

  constructor(public characterService: CharacterService) {}

  ngOnInit(): void {}

  toggleAddToFavorites(entry: Parse.Object) {
    // NOTE: Liskov substitution
    // I manage the entry as a Parse.Object because I don't need to access properties from the subclass Character.
    // I could manage this entry as:
    // entry as Character if I need a specific property from the child.
    this.toggleAddToFavoritesEmitter.emit(entry);
  }

  loadMore() {
    this.loadMoreEmitter.emit();
  }

  completeInfiniteScroll() {
    this.infiniteScroll.complete();
  }
}
