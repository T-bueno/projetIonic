import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3FavoritePage } from './tab3-favorite.page';

describe('Tab3FavoritePage', () => {
  let component: Tab3FavoritePage;
  let fixture: ComponentFixture<Tab3FavoritePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3FavoritePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3FavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
