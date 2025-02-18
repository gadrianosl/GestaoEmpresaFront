import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true // Isso é necessário para standalone components
})
export class ProdutosComponent {
  produto = {
    codigo: '',
    descricao: '',
    descricaoDetalhada: '',
    unidade: '',
    precoCusto: 0,
    precoVenda: 0,
    quantidade: 0
  };

    // Lista de produtos de exemplo
    produtos = [
      {
        codigo: 'P001',
        descricao: 'Produto 1',
        descricaoDetalhada: 'Produto de exemplo 1',
        unidade: 'Unidade 1',
        precoCusto: 10.00,
        precoVenda: 15.00
      },
      {
        codigo: 'P002',
        descricao: 'Produto 2',
        descricaoDetalhada: 'Produto de exemplo 2',
        unidade: 'Unidade 2',
        precoCusto: 20.00,
        precoVenda: 30.00
      },
      {
        codigo: 'P003',
        descricao: 'Produto 3',
        descricaoDetalhada: 'Produto de exemplo 3',
        unidade: 'Unidade 3',
        precoCusto: 5.00,
        precoVenda: 7.50
      }
    ];

      // Objeto para armazenar os dados do produto que será inserido ou editado
  produtoEditado = {
    codigo: '',
    descricao: '',
    descricaoDetalhada: '',
    unidade: '',
    precoCusto: null,
    precoVenda: null
  };

  onSubmit() {
    // Lógica para salvar o produto, por exemplo:
    console.log('Produto salvo:', this.produto);
    // Aqui, você pode enviar os dados para a API ou realizar outras ações
  }
  
    // Método para adicionar um novo produto
    addProduto(form: any) {
      if (this.produtoEditado.codigo) {
        // Se já tiver código, é um produto que estamos editando
        this.editProduto(form);
      } else {
        // Se não tiver código, é um novo produto
        this.produtos.push(form);
      }

    // Limpa o formulário após adicionar
    this.produtoEditado = {
      codigo: '',
      descricao: '',
      descricaoDetalhada: '',
      unidade: '',
      precoCusto: null,
      precoVenda: null
    };
      form = {}; // Limpar formulário após adicionar
    // Exibe o popup de confirmação
    this.showSuccessPopup();
  }

    // Método para editar produto
    editProduto(form: any) {
      const index = this.produtos.findIndex(produto => produto.codigo === this.produtoEditado.codigo);
      if (index !== -1) {
        this.produtos[index] = form;
      }
    }

      // Método para selecionar um produto para edição
  selectProduto(produto: any) {
    this.produtoEditado = { ...produto };  // Copia os dados para o formulário de edição
  }

  // Método para exibir o popup de sucesso
  showSuccessPopup() {
    window.alert("Produto inserido com sucesso!");
  }
  
    // Método para excluir um produto
    removeProduto(index: number) {
      this.produtos.splice(index, 1);
    }
  }

