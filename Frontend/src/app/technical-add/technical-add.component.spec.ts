import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAddComponent } from './technical-add.component';

describe('TechnicalAddComponent', () => {
  let component: TechnicalAddComponent;
  let fixture: ComponentFixture<TechnicalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
