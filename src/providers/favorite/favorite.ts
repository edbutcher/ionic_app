import {Http} from '@angular/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(
    public http: Http,
    private dishservice: DishProvider,
    private storage: Storage) {

    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];

    storage.get('favorites').then(favorites => {
      if (favorites) {
        console.log(this.favorites, favorites);
        this.favorites = favorites;
      }
      else
        console.log('favorites not defined');
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
      // add data to Data Base
      this.storage.set('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      // remove data from Data Base
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    } else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
