// edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../clients';
import { ClientService } from '../client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  client: Client = new Client(); // Initialiser avec un nouveau client
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Ne pas ajouter 'Access-Control-Allow-Origin' ici
    }),
  };
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private location: Location,
  ) {}
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    // Récupérer l'id du client depuis les paramètres de la route
    this.route.params.subscribe(params => {
      const idClient = params['idClient'];
      this.clientService.getClientById(idClient).subscribe(data => {
        console.log(data);
        this.client.idClient = data.idClient;
        this.client.codecl = data.codecl;
        this.client.nom = data.nom;
        this.client.prenom = data.prenom;
        this.client.adresse = data.adresse;
        this.client.actif = data.actif;
        this.client.tel = data.tel;
        this.client.email = data.email;
      
      });
    });
  }


onSubmit(): void {
  this.clientService.updateClient(this.client.idClient, this.client).subscribe(data => {
    this.router.navigate(['/clients']);
  });
}

}  