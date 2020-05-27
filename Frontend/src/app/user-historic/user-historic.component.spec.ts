import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoricComponent } from './user-historic.component';

describe('UserHistoricComponent', () => {
  let component: UserHistoricComponent;
  let fixture: ComponentFixture<UserHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
