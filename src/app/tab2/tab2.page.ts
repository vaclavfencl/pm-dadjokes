import { Component } from '@angular/core';
import { FavoriteStorageService } from '../services/favorite-storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  userJoke: string = ''; // User's joke input
  showSuccessMessage: boolean = false; // Controls success message visibility

  constructor(private favoriteService: FavoriteStorageService) {}

  /**
   * Save the user's joke to favorites.
   */
  async saveUserJoke() {
    const joke = this.userJoke.trim();
    if (!joke) {
      console.error('Joke cannot be empty.');
      return;
    }

    try {
      await this.favoriteService.addFavorite(joke); // Save joke to favorites
      this.showSuccessMessage = true; // Show success message
      this.userJoke = ''; // Clear the input field

      // Hide the success message after a few seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } catch (error) {
      console.error('Error saving joke to favorites:', error);
    }
  }
}
