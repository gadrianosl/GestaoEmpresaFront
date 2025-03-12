import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../services/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
    imports: [CommonModule, FormsModule, FontAwesomeModule],
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  produtos: Produto[] = [];
  produto: Produto = {
    id: undefined,
    codigo: '',
    descricao: '',
    descricaoDetalhada: '',
    unidade: '',
    precoCusto: 0,
    precoVenda: 0
  };
  editando: boolean = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.listarProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  salvarProduto(): void {
    if (this.editando) {
      this.produtoService.atualizarProduto(this.produto.id!, this.produto).subscribe(() => {
        this.listarProdutos();
        this.cancelarEdicao();
      });
    } else {
      this.produtoService.salvarProduto(this.produto).subscribe(() => {
        this.listarProdutos();
        this.limparCampos();
      });
    }
  }

  editarProduto(produto: Produto): void {
    this.produto = { ...produto };
    this.editando = true;
  }

  deletarProduto(id: number | null| undefined): void {
    if (id === undefined || id === null) {
      console.error("Erro: Código do produto é indefinido!");
      return;
    }

    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe(() => {
        this.listarProdutos();
      });
    }
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.limparCampos();
  }

  limparCampos(): void {
    this.produto = {
      codigo: '',
      descricao: '',
      descricaoDetalhada: '',
      unidade: '',
      precoCusto: 0,
      precoVenda: 0
    };
  }
}
