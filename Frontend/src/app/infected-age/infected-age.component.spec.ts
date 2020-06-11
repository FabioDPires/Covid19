import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectedAgeComponent } from './infected-age.component';

describe('InfectedAgeComponent', () => {
  let component: InfectedAgeComponent;
  let fixture: ComponentFixture<InfectedAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectedAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectedAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
