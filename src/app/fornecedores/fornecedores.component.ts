import { Component, OnInit } from '@angular/core';
import { FornecedorService, Fornecedor } from '../services/fornecedores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  standalone: true // Isso é necessário para standalone components
})
export class FornecedoresComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  fornecedores: Fornecedor[] = [];
  fornecedor: Fornecedor = { nome: '', cnpj: '', endereco: '', telefone: '', email: '' };
  editando = false;
  fornecedorId?: number;

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit() {
    console.log('FornecedoresComponent inicializado');
    this.listarFornecedores();
  }

  listarFornecedores() {
    this.fornecedorService.listarFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  salvarFornecedor(): void {
    if (!this.fornecedor.nome || !this.fornecedor.cnpj || !this.fornecedor.endereco || !this.fornecedor.telefone || !this.fornecedor.email) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    if (this.editando && this.fornecedorId) {
      // Se está editando, atualiza o fornecedor
      this.fornecedor.id = this.fornecedorId;
      this.fornecedorService.atualizarFornecedor(this.fornecedor).subscribe({
        next: (fornecedorAtualizado: Fornecedor) => {
          const index = this.fornecedores.findIndex(f => f.id === fornecedorAtualizado.id);
          if (index !== -1) {
            this.fornecedores[index] = fornecedorAtualizado;
          }
          this.resetarFormulario(); // Resetar o formulário após a atualização
        },
        error: (err) => {
          console.error('Erro ao atualizar fornecedor:', err);
          alert('Erro ao atualizar fornecedor. Verifique o console.');
        }
      });
    } else {
      console.log(this.fornecedor)
      // Caso contrário, cria um novo fornecedor
      this.fornecedorService.criarFornecedor(this.fornecedor).subscribe({
        next: (novoFornecedor: Fornecedor) => {
          this.fornecedores.push(novoFornecedor);
          this.resetarFormulario(); // Resetar o formulário após salvar
        },
        error: (err) => {
          console.error('Erro ao salvar fornecedor:', err);
          alert('Erro ao salvar fornecedor. Verifique o console.');
        }
      });
    }
  }

  editarFornecedor(fornecedor: Fornecedor) {
    this.fornecedor = { ...fornecedor };
    this.fornecedorId = fornecedor.id;
    this.editando = true;
  }

  excluirFornecedor(id?: number) {
    if (id) {
      this.fornecedorService.excluirFornecedor(id).subscribe(() => {
        this.listarFornecedores();
      });
    }
  }

  resetarFormulario() {
    this.fornecedor = { nome: '', cnpj: '', endereco: '', telefone: '', email: '' };
    this.editando = false;
  }
}
