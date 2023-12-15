import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Client } from '../clients';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() idClient: object;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  clients: Client=new Client();
  constructor(private clientserv:ClientService){}
  ngOnInit(){
  this.clientserv.getClientById(this.idClient).subscribe(data => {
  this.clients = data;
  });

  }
  openModal() {
  this.display = "block";
  }
  closeModal() {
  this.display = "none";
  }
  }