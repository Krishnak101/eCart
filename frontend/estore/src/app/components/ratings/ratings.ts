import { Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-ratings',
  imports: [FontAwesomeModule],
  templateUrl: './ratings.html',
  styleUrl: './ratings.css',
})
export class Ratings {
  faStar = faStar;
  faHalfStar = faStarHalfStroke;
  faEmptyStar = faEmptyStar;
  score = input<number>(0);

  stars = computed(() => {
    const value = Math.min(this.score(), 5);
    const icons: IconDefinition[] = [];
    const solidStars: number = Math.floor(value);
    const halfStar: boolean = value - solidStars >= 5;
    for (let i = 0; i < solidStars; i++) {
      icons.push(this.faStar);
    }
    if (halfStar) {
      icons.push(this.faHalfStar);
    }
    while (icons.length < 5) {
      icons.push(this.faEmptyStar);
    }
    return [...icons];
  });
}
