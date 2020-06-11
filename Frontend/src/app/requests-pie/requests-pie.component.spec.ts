import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPieComponent } from './requests-pie.component';

describe('RequestsPieComponent', () => {
  let component: RequestsPieComponent;
  let fixture: ComponentFixture<RequestsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
