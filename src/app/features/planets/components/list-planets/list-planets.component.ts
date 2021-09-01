import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-planets',
  templateUrl: './list-planets.component.html',
  styleUrls: ['./list-planets.component.scss'],
})
export class ListPlanetsComponent {
  @Input() list: Parse.Object[];
  @Output() toggleAddToPlanetsEmitter = new EventEmitter<any>();

  toggleAddToPlanets(entry: Parse.Object) {
    this.toggleAddToPlanetsEmitter.emit(entry);
  }
}
