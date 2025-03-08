import { Component, OnInit } from '@angular/core';
import { Venda, VendaProduto, VendaService } from '../services/venda.service';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Produto, ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-venda',
  templateUrl: './vendas.component.html',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  styleUrls: ['./vendas.component.css']
})

export class VendaComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  vendas: Venda[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  venda: Venda = { cliente: {} as Cliente, dataVenda: '', total: 0, status: 'PENDENTE', itens: [] };
  produtoSelecionado!: number; // Alterado para armazenar ID do produto

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.listarVendas();
    this.carregarClientes();
    this.carregarProdutos();
  }

  listarVendas(): void {
    this.vendaService.listarVendas().subscribe(data => this.vendas = data);
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe(data => this.clientes = data);
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(data => this.produtos = data);
  }

  adicionarProduto(): void {
    // Busca o produto pelo ID selecionado
    const produto = this.produtos.find(p => p.id === Number(this.produtoSelecionado));
    if (!produto) return;

    // Cria um item de venda corretamente formatado
    const item: VendaProduto = {
      produto: produto,
      quantidade: 1,
      precoUnitario: produto.precoVenda,
      subtotal: produto.precoVenda
    };

    // Adiciona à lista de itens da venda
    this.venda.itens.push(item);
    this.calcularTotal();
  }

  removerProduto(index: number | undefined): void {
    if (index === undefined) {
      console.error("Erro: Código do produto é indefinido!");
      return;
    }
    this.venda.itens.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.venda.total = this.venda.itens.reduce((sum, item) => sum + item.subtotal, 0);
  }

  salvarVenda(): void {
    this.vendaService.salvar(this.venda).subscribe(() => {
      this.listarVendas();
      this.venda = { cliente: {} as Cliente, dataVenda: '', total: 0, status: 'PENDENTE', itens: [] };
    });
  }

  excluirVenda(id: number | undefined): void {
    if (id === undefined) {
      console.error("Erro: Código da venda é indefinido!");
      return;
    }
    this.vendaService.excluir(id).subscribe(() => this.listarVendas());
  }

  editarVenda(venda: Venda) {
    this.venda = {
      ...venda, // Copia os dados básicos da venda
      cliente: venda.cliente ? { ...venda.cliente } : {} as Cliente, // Copia os dados do cliente
      itens: venda.itens && venda.itens.length > 0 ? venda.itens.map(item => ({
        ...item, // Copia as propriedades do item
        produto: item.produto ? { ...item.produto } : { // Atribui um produto vazio, se necessário
          id: 0,
          codigo: '',
          descricao: '',
          descricaoDetalhada: '',
          unidade: '',
          precoCusto: 0,
          precoVenda: 0
        }
      })) : [] // Se não houver itens, atribui um array vazio
    };
  
  }
  
}
