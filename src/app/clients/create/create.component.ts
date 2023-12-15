import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilePondComponent } from 'ngx-filepond';
import { Client } from '../clients';
import { ClientService } from '../client.service';

@Component({
selector: 'app-create',
templateUrl: './create.component.html',
styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('myModal') myModal!: ElementRef;
@ViewChild('myPond') myPond: FilePondComponent;
display = "none";
clients:Client=new Client()
  constructor(private clientService: ClientService) {}

    ngOnInit(){
    }
addClient = () => {
  this.clientService.addClient(this.clients).subscribe(
    (data) => {
      console.log(data);
   
      this.closeModal();
      window.location.reload();
    },
    (error) => {
      console.error(error);
    }
  );
}

openModal() {
  this.display = 'block';
}

closeModal() {
  this.display = 'none';
}
}




