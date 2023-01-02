import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateNameComponent } from './modal-update-name.component';

describe('ModalUpdateNameComponent', () => {
  let component: ModalUpdateNameComponent;
  let fixture: ComponentFixture<ModalUpdateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
