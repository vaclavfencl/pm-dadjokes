import { Component, OnInit } from '@angular/core';
import { FavoriteStorageService } from '../services/favorite-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favorites: string[] = [];
  filteredFavorites: string[] = [];
  searchTerm: string = '';

  constructor(private favoriteService: FavoriteStorageService) {}

  async ngOnInit() {
    await this.loadFavorites(); 
  }

  async ionViewWillEnter() {
    await this.loadFavorites(); 
  }

  async loadFavorites() {
    try {
      this.favorites = await this.favoriteService.getFavorites();
      this.filteredFavorites = [...this.favorites];
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  filterFavorites() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredFavorites = [...this.favorites];
    } else {
      this.filteredFavorites = this.favorites.filter((joke) =>
        joke.toLowerCase().includes(term)
      );
    }
  }

  async removeFavorite(joke: string) {
    try {
      await this.favoriteService.removeFavorite(joke);
      await this.loadFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }
}
