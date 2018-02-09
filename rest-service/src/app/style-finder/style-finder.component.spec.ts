import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFinderComponent } from './style-finder.component';

describe('StyleFinderComponent', () => {
  let component: StyleFinderComponent;
  let fixture: ComponentFixture<StyleFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
