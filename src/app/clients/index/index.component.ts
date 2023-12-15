import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../clients';
import { ClientService } from '../client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  mostPurchasedProducts: Record<string, number> = {};

  productDesignations: Record<string, string> = {};
 sortedProductsByQuantity: any[] = [];
  getMostSolicitedProductsByClient:any;
  resteGlobalMontantsNonPayes: number = 0;
  facturesReglees: any;
  facturesNonReglees: any;
  selectedClientId: number | null = null;
  showView: boolean = false;
  allClientsData: any[] = [];
  MostSolicitedProductsByClientAndYear:any;
  clientIdFormControl = new FormControl(); 
  year:any = new FormControl();
  selectedYear: number | null = null;
  chiffreAffairesGlobal: number;
  chiffreAffairesAnnee: number;
  clientId: number;
  nomclient: String;
  annee: number;
  Object = Object;
  clients: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  columns: string[] = ['actif', 'codecl', 'nom', 'prenom', 'adresse', 'tel', 'email', 'idClient'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private clientService: ClientService) { }
 
  ngOnInit(): void {
    const clientId = 1;
    this.clientService.getMostPurchasedProducts(clientId).subscribe(
      (data) => {
        this.sortedProductsByQuantity = Object.keys(data).sort((a, b) => data[b] - data[a]);
        console.log('Produits triés par quantité:', this.sortedProductsByQuantity);
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits les plus achetés :', error);
      }
    );
    this.clientIdFormControl.valueChanges.subscribe((clientId) => {
      this.selectedClientId = clientId;
      this.fetchData(clientId); 
      this.getResteGlobalMontantsNonPayes();
    }) ;
    
    this.clientService.getAllClients().subscribe(
      (data: Client[]) => {
        this.clients = new MatTableDataSource<Client>(data);
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
      },
    );
    
    this.year.valueChanges.subscribe((selectedYear: number) => {
      this.annee = selectedYear;
      this.getChiffreAffairesAnnee(); // Appel à la méthode pour récupérer le chiffre d'affaires pour cette année
    });
    
  }
  fetchData(clientId: any) {
    this.clientService.getFacturesReglees(clientId).subscribe((data: any) => {
      this.facturesReglees = data;
     
    });
    this.clientId = clientId; 
    this.clientService.getFacturesNonReglees(clientId).subscribe((data: any) => {
      this.facturesNonReglees = data;
    });
    this.clientService.getMostPurchasedProducts(clientId).subscribe(
      (data) => {
        console.log('Données reçues pour les produits les plus achetés :', data);
        this.mostPurchasedProducts = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits les plus achetés :', error);
      }
    );
  }
  hasPurchasedProductsWithQuantity(): boolean {
    return Object.values(this.mostPurchasedProducts).some(quantity => quantity > 0);
}

getResteGlobalMontantsNonPayes(): void {
  this.clientService.getResteGlobalMontantsNonPayes(this.clientId).subscribe(
    (data: any) => {
      console.log('Données reçues pour le reste global des montants non payés :', data);
      this.resteGlobalMontantsNonPayes = data; 
    },
    (error) => {
      console.error('Erreur lors de la récupération du reste global des montants non payés :', error);
      this.resteGlobalMontantsNonPayes = 0; 
    }
  );
}

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getProductDesignation(key: string): string {
    return this.productDesignations[key] || 'Désignation inconnue';
  }
getClientIdAsNumber(clientId: any) {
                return parseInt(clientId, 10);
                
              }
deleteClient(idClient: Object) {
        this.clientService.deleteClient(idClient).subscribe((res) => {
          console.log(res);
          const data = this.clients.filteredData.filter(
            (item: { idClient: object }) => item.idClient !== idClient
          );
          this.clients = new MatTableDataSource<any>(data);
          this.clients.paginator = this.paginator;
          this.clients.sort = this.sort;
        });
      }
  refreshPage() {
        window.location.reload();
    }

    closeView(): void {
      this.showView = false;
    }

    openView(clientId: string): void {
          this.selectedClientId = +clientId;
            this.showView = true;
        }
    openEdit(clientId: number) {
      console.log('Edit client with ID:', clientId);
      this.router.navigate(['clients', clientId, 'edit']);
    }
  getChiffreAffairesGlobal(): void {
    if (this.clientId) {
      this.clientService.getChiffreAffairesGlobal(this.clientId).subscribe(
        (data) => {
          this.chiffreAffairesGlobal = data;
          console.log('Chiffre d\'affaires global :', this.chiffreAffairesGlobal);
        },
        (error) => {
          console.error('Erreur :', error);
        }
      );
    }
  }

 getChiffreAffairesAnnee(): void {
  if (this.clientId && this.annee) {
    console.log('ID Client:', this.clientId);
    console.log('Année:', this.annee);
    
    this.clientService.getChiffreAffairesAnnee(this.clientId, this.annee).subscribe(
      (data) => {
        this.chiffreAffairesAnnee = data;
        console.log('Chiffre d\'affaires pour l\'année spécifiée :', this.chiffreAffairesAnnee);
      },
      (error) => {
        console.error('Erreur :', error);
      }
    );
  } else {
    console.error('Les paramètres clientId ou annee sont manquants ou incorrects.');
  }
}

 
  }  
