import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdatePassComponent } from './modal-update-pass.component';

describe('ModalUpdatePassComponent', () => {
  let component: ModalUpdatePassComponent;
  let fixture: ComponentFixture<ModalUpdatePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdatePassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
