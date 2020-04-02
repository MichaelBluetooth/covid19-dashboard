import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateIncreaseComponent } from './state-increase.component';

describe('StateIncreaseComponent', () => {
  let component: StateIncreaseComponent;
  let fixture: ComponentFixture<StateIncreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateIncreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateIncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
