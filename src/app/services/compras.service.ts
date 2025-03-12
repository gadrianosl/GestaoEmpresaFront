import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Compra {
    id?: number | null;
    fornecedor: { id?: number | null; nome: string; cnpj: string; endereco: string; telefone: string; email: string; } = 
                { id: 0, nome: '', cnpj: '', endereco: '', telefone: '', email: '' };
    dataCompra: string = '';
    status: 'PENDENTE' | 'PAGO' | 'CANCELADO' | undefined;
    total: number = 0;
    itens: { produto: {id?: number |null; codigo: string; descricao: string; descricaoDetalhada: string; unidade: string; 
             precoCusto: number; precoVenda: number;}; precoUnitario: number, quantidade: number }[] = [];
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
    console.log('compra');
    return this.http.post<Compra>(this.apiUrl, compra);
  }

  atualizarCompra(compra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.apiUrl}/${compra.id}`, compra);
  }

  excluirCompra(id: number | undefined | null): Observable<void> {
    if (id === undefined || id === null) {
      console.error("Erro: Código da compra é indefinido!");
      return new Observable<void>();
    }else{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
}
