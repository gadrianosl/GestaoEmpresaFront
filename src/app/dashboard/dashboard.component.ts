import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboardservice';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule]
})
export class DashboardComponent implements OnInit {

  inadimplentesData: any[] = [];
  inadimplentesLabels: string[] = [];

  contasPagarData: any[] = [];
  contasPagarLabels: string[] = [];

  estoqueBaixoData: any[] = [];
  estoqueBaixoLabels: string[] = [];

  contasReceberData: any[] = [];
  contasReceberLabels: string[] = [];

  produtosVencimentoData: any[] = [];
  produtosVencimentoLabels: string[] = [];

  vendasCategoriaData: any[] = [];
  vendasCategoriaLabels: string[] = [];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarClientesInadimplentes();
    this.carregarContasPagar();
    this.carregarEstoqueBaixo();
    this.carregarContasReceber();
    this.carregarProdutosProximosVencimento();
    this.carregarVendasPorCategoria();
  }

  carregarClientesInadimplentes() {
    this.dashboardService.getClientesInadimplentes().subscribe((data: any[]) => {
      this.inadimplentesLabels = data.map(d => d.nome);
      this.inadimplentesData = [{ data: data.map(d => d.valor), label: 'Inadimplentes' }];
    });
  }

  carregarContasPagar() {
    this.dashboardService.getContasPagar().subscribe((data: any[]) => {
      this.contasPagarLabels = data.map(d => d.descricao);
      this.contasPagarData = [{ data: data.map(d => d.valor), label: 'Contas a Pagar' }];
    });
  }

  carregarEstoqueBaixo() {
    this.dashboardService.getEstoqueBaixo().subscribe((data: any[]) => {
      this.estoqueBaixoLabels = data.map(d => d.descricao);
      this.estoqueBaixoData = [{ data: data.map(d => d.quantidade), label: 'Estoque Baixo' }];
    });
  }

  carregarContasReceber() {
    this.dashboardService.getContasReceber().subscribe((data: any[]) => {
      this.contasReceberLabels = data.map(d => d.descricao);
      this.contasReceberData = [{ data: data.map(d => d.valor), label: 'Contas a Receber' }];
    });
  }

  carregarProdutosProximosVencimento() {
    this.dashboardService.getProdutosProximosVencimento().subscribe((data: any[]) => {
      this.produtosVencimentoLabels = data.map(d => d.descricao);
      this.produtosVencimentoData = [{ data: data.map(d => d.quantidade), label: 'Próximos ao Vencimento' }];
    });
  }

  carregarVendasPorCategoria() {
    this.dashboardService.getVendasPorCategoria().subscribe((data: any[]) => {
      this.vendasCategoriaLabels = Object.keys(data);
      this.vendasCategoriaData = [{ data: Object.values(data), label: 'Vendas por Categoria' }];
    });
  }
}
