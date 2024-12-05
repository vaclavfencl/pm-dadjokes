import { Component } from '@angular/core';
import { FavoriteStorageService } from '../services/favorite-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  userJoke: string = ''; 
  showSuccessMessage: boolean = false; 

  constructor(private favoriteService: FavoriteStorageService) {}

  async saveUserJoke() {
    const joke = this.userJoke.trim();
    if (!joke) {
      console.error('Joke cannot be empty.');
      return;
    }

    try {
      await this.favoriteService.addFavorite(joke);
      this.showSuccessMessage = true; 
      this.userJoke = ''; 

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } catch (error) {
      console.error('Error saving joke to favorites:', error);
    }
  }
}
