import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMonthComponent } from './requests-month.component';

describe('RequestsMonthComponent', () => {
  let component: RequestsMonthComponent;
  let fixture: ComponentFixture<RequestsMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
