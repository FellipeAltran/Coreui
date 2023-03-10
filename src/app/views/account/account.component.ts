import { ModalUpdateNameComponent } from './../modal-update-name/modal-update-name.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalUpdatePassComponent } from '../modal-update-pass/modal-update-pass.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any = {};

  modalRef!: BsModalRef;

  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
    this.account();
    this.modalService.onHide.subscribe((e) => {
      console.log('close',this.modalService.config.initialState);
  });
  }

  async account() {
    const user = await localStorage.getItem('user');
    this.user = await JSON.parse(user!);
  }

  openModalPass() {
    const user = {
        id: this.user.id
      };
    this.modalRef = this.modalService.show(ModalUpdatePassComponent, {
      initialState: user as any
    });
    this.modalRef.onHide.subscribe((value) => {
      if (value.hasOwnProperty('password')){
        this.user = value;
        this.modalRef.hide();
      }
      
    });
  }

  openModalName() {
    const user = {
        id: this.user.id
      };
    this.modalRef = this.modalService.show(ModalUpdateNameComponent, {
      initialState: user as any
    });
    this.modalRef.onHide.subscribe((value) => {
      if (value.hasOwnProperty('name')){
        this.user = value;
        this.modalRef.hide();
      }
      
    });
  }

}
