import { Component, OnInit } from '@angular/core';
import { DadJokeService } from '../services/dad-joke.service';
import { FavoriteStorageService } from '../services/favorite-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  joke: string = ''; 

  constructor(
    private dadJokeService: DadJokeService,
    private favoriteService: FavoriteStorageService 
  ) {}

  ngOnInit() {
    this.getNewJoke(); 
  }

  getNewJoke() {
    this.dadJokeService.getRandomJoke().subscribe({
      next: (response) => {
        this.joke = response?.joke || 'No joke found.'; 
      },
      error: (error) => {
        console.error('Error fetching joke:', error);
        this.joke = 'Oops! Unable to fetch a joke right now.';
      },
    });
  }
  
  copyToClipboard() {
    if (!this.joke.trim()) {
      console.error('No joke to copy.');
      return;
    }
    navigator.clipboard.writeText(this.joke).then(
      () => {
        console.log('Joke copied to clipboard:', this.joke);
      },
      (err) => {
        console.error('Could not copy joke:', err);
      }
    );
  }

  async makeFavorite() {
    if (!this.joke.trim()) {
      console.error('No joke to add to favorites.');
      return;
    }
    try {
      await this.favoriteService.addFavorite(this.joke); 
    } catch (error) {
      console.error('Error adding joke to favorites:', error);
    }
  }
}
