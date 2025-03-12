import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definindo a interface Fornecedor
export interface Fornecedor {
  id?: number | null;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = 'http://localhost:8080/api/fornecedores';  // URL para API (ajustar conforme necessário)

  constructor(private http: HttpClient) {}

  // Listar todos os fornecedores
  listarFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  // Criar um novo fornecedor
  criarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.apiUrl, fornecedor);
  }

  // Excluir um fornecedor
  excluirFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar um fornecedor por ID
  buscarFornecedorPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

    // Método para atualizar um fornecedor existente
    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
      return this.http.put<Fornecedor>(`${this.apiUrl}/${fornecedor.id}`, fornecedor);
    }
}

