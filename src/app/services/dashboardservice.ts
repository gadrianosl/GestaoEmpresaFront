import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getClientesInadimplentes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/inadimplentes`);
  }

  getContasPagar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/compras`);
  }

  getEstoqueBaixo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estoque-baixo`);
  }

  getContasReceber(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vendas`);
  }

  getProdutosProximosVencimento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produtos-vencimento`);
  }

  getVendasPorCategoria(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vendas-categoria`);
  }
}
