import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinNameComponent } from './coin-name.component';

describe('CoinNameComponent', () => {
  let component: CoinNameComponent;
  let fixture: ComponentFixture<CoinNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
