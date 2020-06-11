import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectedSexComponent } from './infected-sex.component';

describe('InfectedSexComponent', () => {
  let component: InfectedSexComponent;
  let fixture: ComponentFixture<InfectedSexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectedSexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectedSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
