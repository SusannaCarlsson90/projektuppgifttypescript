import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myschedule } from './myschedule';

describe('Myschedule', () => {
  let component: Myschedule;
  let fixture: ComponentFixture<Myschedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myschedule],
    }).compileComponents();

    fixture = TestBed.createComponent(Myschedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
