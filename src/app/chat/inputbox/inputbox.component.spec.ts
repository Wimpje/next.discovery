import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputboxComponent } from './inputbox.component';

describe('InputboxComponent', () => {
  let component: InputboxComponent;
  let fixture: ComponentFixture<InputboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputboxComponent]
    });
    fixture = TestBed.createComponent(InputboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
