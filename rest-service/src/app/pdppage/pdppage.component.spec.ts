import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdppageComponent } from './pdppage.component';

describe('PdppageComponent', () => {
  let component: PdppageComponent;
  let fixture: ComponentFixture<PdppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
