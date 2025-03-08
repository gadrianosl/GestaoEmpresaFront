import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Compra {
    id?: number;
    fornecedor: { id: number; nome: string } = { id: 0, nome: '' };
    dataCompra: string = '';
    status: 'PENDENTE' | 'PAGO' | 'CANCELADO' | undefined;
    total: number = 0;
  }

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:8080/api/compras';

  constructor(private http: HttpClient) {}

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  criarCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, compra);
  }

  atualizarCompra(compra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/${compra.id}`, compra);
  }

  excluirCompra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
