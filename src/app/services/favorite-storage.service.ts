import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavoriteStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addFavorite(joke: string): Promise<void> {
    const favorites = (await this.getFavorites()) || [];
    if (!favorites.includes(joke)) {
      favorites.push(joke);
      await this._storage?.set('favorites', favorites);
    }
  }

  async removeFavorite(joke: string): Promise<void> {
    const favorites = (await this.getFavorites()) || [];
    const updatedFavorites = favorites.filter((fav) => fav !== joke);
    await this._storage?.set('favorites', updatedFavorites);
  }

  async getFavorites(): Promise<string[]> {
    return (await this._storage?.get('favorites')) || [];
  }
}
