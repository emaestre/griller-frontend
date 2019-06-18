import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillsComponent } from './grills.component';

describe('GrillsComponent', () => {
  let component: GrillsComponent;
  let fixture: ComponentFixture<GrillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
