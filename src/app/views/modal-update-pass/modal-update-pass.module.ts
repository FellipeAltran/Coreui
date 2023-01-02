import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalModule as cuiModal } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    cuiModal
    
  ]
})

export class ModalUpdatePassModule { }
