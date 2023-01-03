import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalUpdateNameService } from './modal-update-name.service';
import { UpdateName } from './modal-update-name.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-update-name',
  templateUrl: './modal-update-name.component.html',
  styleUrls: ['./modal-update-name.component.scss']
})
export class ModalUpdateNameComponent implements OnInit {

  formUpdateName!: FormGroup;

  user!: any;

  constructor(private service: ModalUpdateNameService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.createForm(new UpdateName());
  }

  createForm(updateName: UpdateName) {
    this.formUpdateName = new FormGroup({
      name: new FormControl(updateName.name, [Validators.required])
    });
  }

  save() {
    const obj = this.formUpdateName.getRawValue();
    const tempUser = JSON.parse(localStorage.getItem('user')!);

    if (obj.name != null) {
      this.service.updateName(tempUser.name, obj.name).subscribe((value) => {
        if (value.boolean == true) {
          tempUser.name = obj.name;
          const aux = JSON.stringify(tempUser);
          localStorage.setItem('user', aux);
          this.service.sucessMessage(value.message);
          this.modalRef.onHide.emit(tempUser);
        } else {
          this.service.errorMessage(value.message);
        }
      });
    } else {
      this.service.errorMessage('Invalid user name!');
    }
      
  }
}
