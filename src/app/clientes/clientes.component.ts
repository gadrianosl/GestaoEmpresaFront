import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [CommonModule],
  standalone: true // Isso é necessário para standalone components
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = { nome: '', email: '', cpfOuCnpj: '', telefone: '' };
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

  salvarCliente() {
    if (this.editando) {
      this.clienteService.atualizarCliente(this.clienteId!, this.cliente).subscribe(() => {
        this.listarClientes();
        this.resetarFormulario();
      });
    } else {
      this.clienteService.criarCliente(this.cliente).subscribe(() => {
        this.listarClientes();
        this.resetarFormulario();
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
    this.cliente = { nome: '', email: '', cpfOuCnpj: '', telefone: '' };
    this.editando = false;
  }
}
