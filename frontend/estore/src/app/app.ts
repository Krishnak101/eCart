import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { CategoryNavigation } from './components/category.navigation/category.navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CategoryNavigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('estore');
}
