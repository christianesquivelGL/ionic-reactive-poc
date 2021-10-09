import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class ParseUtilsService {
  constructor() {}

  public async getRelationList(
    relation: Parse.Relation,
  ): Promise<Parse.Object<Parse.Attributes>[]> {
    return relation.query().find();
  }
}
