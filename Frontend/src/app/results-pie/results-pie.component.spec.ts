import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPieComponent } from './results-pie.component';

describe('ResultsPieComponent', () => {
  let component: ResultsPieComponent;
  let fixture: ComponentFixture<ResultsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
