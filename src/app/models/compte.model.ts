import { IClient } from "./client.model";

export interface ICompte {
  idCompteBanque:               number;
  numero:                       string,
  type:                         string,
  dateCreation:                 Date;
  statut:                       string;
  solde:                        number;
  decouvert:                    number;
  tauxInteret:                  number;
  clientDTO:                    IClient;
}
