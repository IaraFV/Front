import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pessoa } from "../models/Pessoas";

@Injectable()
export class PessoasService{
  elementApiUrl = ' https://sistema-aprendizes-brisanet-go.herokuapp.com/pessoas';
  constructor(private http: HttpClient){}


  getElements(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.elementApiUrl);
  }
}
