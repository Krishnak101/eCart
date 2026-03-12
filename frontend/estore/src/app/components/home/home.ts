import { Component } from '@angular/core';
import { Header } from './header/header';
import { CategoryNavigation } from './category.navigation/category.navigation';

@Component({
  selector: 'app-home',
  imports: [Header, CategoryNavigation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
