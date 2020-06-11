import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPieComponent } from './health-pie.component';

describe('HealthPieComponent', () => {
  let component: HealthPieComponent;
  let fixture: ComponentFixture<HealthPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
