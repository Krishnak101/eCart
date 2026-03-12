import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNavigation } from './category.navigation';

describe('CategoryNavigation', () => {
  let component: CategoryNavigation;
  let fixture: ComponentFixture<CategoryNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
