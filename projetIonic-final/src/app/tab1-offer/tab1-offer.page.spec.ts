import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1OfferPage } from './tab1-offer.page';

describe('Tab1OfferPage', () => {
  let component: Tab1OfferPage;
  let fixture: ComponentFixture<Tab1OfferPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1OfferPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1OfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
