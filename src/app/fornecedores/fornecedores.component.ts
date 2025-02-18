import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true // Isso é necessário para standalone components
})
export class FornecedoresComponent {
  // Lista de fornecedores de exemplo
  fornecedores = [
    { nome: 'Fornecedor 1', cnpj: '12.345.678/0001-90', endereco: 'Rua 1, 100', telefone: '(11) 1234-5678', email: 'fornecedor1@email.com' },
    { nome: 'Fornecedor 2', cnpj: '98.765.432/0001-09', endereco: 'Avenida 2, 200', telefone: '(11) 9876-5432', email: 'fornecedor2@email.com' },
    { nome: 'Fornecedor 3', cnpj: '11.223.344/0001-56', endereco: 'Rua 3, 300', telefone: '(21) 4567-1234', email: 'fornecedor3@email.com' }
  ];

  // Objeto para armazenar os dados do fornecedor que será inserido ou editado
  fornecedorEditado = {
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: ''
  };

  // Método para adicionar ou editar fornecedor
  addFornecedor(form: any) {
    if (this.fornecedorEditado.cnpj) {
      // Se já tiver CNPJ, é um fornecedor que estamos editando
      this.editFornecedor(form);
    } else {
      // Se não tiver CNPJ, é um novo fornecedor
      this.fornecedores.push(form);
    }

    // Limpa o formulário após adicionar
    this.fornecedorEditado = {
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      email: ''
    };
  }

  // Método para editar fornecedor
  editFornecedor(form: any) {
    const index = this.fornecedores.findIndex(fornecedor => fornecedor.cnpj === this.fornecedorEditado.cnpj);
    if (index !== -1) {
      this.fornecedores[index] = form;
    }
  }

  // Método para selecionar um fornecedor para edição
  selectFornecedor(fornecedor: any) {
    this.fornecedorEditado = { ...fornecedor };  // Copia os dados para o formulário de edição
  }

  // Método para excluir um fornecedor
  removerFornecedor(index: number) {
    this.fornecedores.splice(index, 1);
  }
}
