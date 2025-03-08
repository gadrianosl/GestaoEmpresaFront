import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  standalone: true // Isso é necessário para standalone components
})
export class ClientesComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  clientes: Cliente[] = [];
  cliente: Cliente = { nome: '', email: '', cpf: '', telefone: '', endereco: '' };
  editando = false;
  clienteId?: number;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    console.log('ClientesComponent inicializado');
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  salvarCliente(): void {
    if (!this.cliente.nome || !this.cliente.email || !this.cliente.cpf || !this.cliente.telefone || !this.cliente.endereco) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    // Se estamos editando, chamamos o método de atualização, senão, criamos um novo cliente
    if (this.editando) {
      this.clienteService.atualizarCliente(this.cliente).subscribe({
        next: (clienteAtualizado) => {
          // Atualiza a lista de clientes com o cliente editado
          const index = this.clientes.findIndex(c => c.id === clienteAtualizado.id);
          if (index !== -1) {
            this.clientes[index] = clienteAtualizado;
          }
          this.resetarFormulario(); // Resetar formulário após salvar
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente:', err);
          alert('Erro ao atualizar cliente. Verifique o console.');
        }
      });
    } else {
      // Caso não estejamos editando, criamos um novo cliente
      this.clienteService.criarCliente(this.cliente).subscribe({
        next: (novoCliente) => {
          this.clientes.push(novoCliente);
          this.resetarFormulario(); // Resetar formulário após salvar
        },
        error: (err) => {
          console.error('Erro ao salvar cliente:', err);
          alert('Erro ao salvar cliente. Verifique o console.');
        }
      });
    }
  }

  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.clienteId = cliente.id;
    this.editando = true;
  }

  excluirCliente(id?: number) {
    if (id) {
      this.clienteService.excluirCliente(id).subscribe(() => {
        this.listarClientes();
      });
    }
  }

  resetarFormulario() {
    this.cliente = { nome: '', email: '', cpf: '', telefone: '', endereco: '' };
    this.editando = false;
  }
}
