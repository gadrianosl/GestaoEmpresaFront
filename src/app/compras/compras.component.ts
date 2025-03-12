import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { CompraService, Compra } from '../services/compras.service';
import { FornecedorService, Fornecedor } from '../services/fornecedores.service';
import { Produto, ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  // Ícones FontAwesome
  faEdit = faEdit;
  faTrash = faTrash;

  compras: Compra[] = [];
  fornecedores: Fornecedor[] = [];
  produtos: Produto[] = [];

  compraSelecionada: Compra = this.novaCompra();
  produtoSelecionado: number | null = null;

  constructor(
    private comprasService: CompraService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarCompras();
    this.carregarFornecedores();
    this.carregarProdutos();
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

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe((data) => {
      this.produtos = data;
    });
  }

  novaCompra(): Compra {
    return {
      id: null,
      fornecedor: { id: null, nome: '', cnpj: '', endereco: '', telefone: '', email: '' },
      dataCompra: '',
      total: 0,
      status: 'PENDENTE',
      itens: []
    };
  }

  editarCompra(compra: Compra) {
    this.compraSelecionada = { ...compra };
    console.log(this.compraSelecionada);
  }

  salvarCompra() {
    console.log(this.compraSelecionada);
    if (!this.compraSelecionada || !this.compraSelecionada.fornecedor.id) return;

    this.comprasService.criarCompra(this.compraSelecionada).subscribe(() => {
      this.carregarCompras();
      this.compraSelecionada = this.novaCompra();
    });
  }

  excluirCompra(id: number | undefined | null) {
    if (id === undefined) {
      console.error("Erro: Código da compra é indefinido!");
      return;
    }

    this.comprasService.excluirCompra(id).subscribe(() => {
      this.carregarCompras();
    });
  }

  adicionarProduto(): void {
    if (!this.produtoSelecionado) return;

    const produto = this.produtos.find(p => p.id === Number(this.produtoSelecionado));
    if (!produto) return;

    const itemExistente = this.compraSelecionada.itens.find(item => item.produto.id ===  Number(produto.id));
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.compraSelecionada.itens.push({
        produto: produto,
        precoUnitario: produto.precoCusto,
        quantidade: 1,
      });
    }

    this.calcularTotal();
    this.produtoSelecionado = null;
  }

  removerProduto(id: number | null | undefined): void {
    if (id === undefined) {
      console.error("Erro: Código da venda é indefinido!");
      return;
    }
    if (!id) return;

    this.compraSelecionada.itens = this.compraSelecionada.itens.filter(item => item.produto.id !== id);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.compraSelecionada.total = this.compraSelecionada.itens.reduce(
      (acc, item) => acc + (item.precoUnitario * item.quantidade),
      0
    );
  }
}
