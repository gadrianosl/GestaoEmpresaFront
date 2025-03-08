import { Component, OnInit } from '@angular/core';
import { Compra, CompraService } from '../services/compras.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Fornecedor, FornecedorService } from '../services/fornecedores.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
   faEdit = faEdit;
   faTrash = faTrash;
   compras: Compra[] = [];
   fornecedores: Fornecedor[] = [];
   compraSelecionada: Compra = { fornecedor: {} as Fornecedor,  dataCompra: '',  total: 0,  status: 'PENDENTE',  itens: []  };
 
   constructor(
     private comprasService: CompraService,
     private fornecedorService: FornecedorService
   ) {}
 
   ngOnInit(): void {
     this.carregarCompras();
     this.carregarFornecedores();
   }
 
   carregarCompras() {
     this.comprasService.getCompras().subscribe((data) => {
       this.compras = data;
     });
   }
 
   carregarFornecedores() {
     this.fornecedorService.listarFornecedores().subscribe((data) => {
       this.fornecedores = data;
     });
   }
 
   novaCompra() {
     this.compraSelecionada = new Compra();
   }
 
   editarCompra(compra: Compra) {
     this.compraSelecionada = { ...compra };
   }
 
   salvarCompra() {
     if (this.compraSelecionada) {
       this.comprasService.criarCompra(this.compraSelecionada).subscribe(() => {
         this.carregarCompras();
         this.compraSelecionada = null;
       });
     }
   }
 
   excluirCompra(id: number | undefined) {
    if (id === undefined) {
      console.error("Erro: Código da venda é indefinido!");
      return;
    }
     this.comprasService.excluirCompra(id).subscribe(() => {
       this.carregarCompras();
     });
   }
 }