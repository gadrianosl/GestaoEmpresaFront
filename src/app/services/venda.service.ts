import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.service';
import { Cliente } from './cliente.service';

export interface VendaProduto {
    id?: number;
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
  }
  
  export interface Venda {
    id?: number;
    cliente: Cliente;
    dataVenda: string;
    total: number;
    status: string;
    itens: VendaProduto[];
  }

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:8080/api/vendas';

  constructor(private http: HttpClient) {}

  listarVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  salvar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
