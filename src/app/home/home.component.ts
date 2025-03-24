import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgChartsModule, DashboardComponent]
})
export class HomeComponent {

  // Dados dos gráficos existentes

  inadimplentesData: ChartDataset[] = [
    {
      data: [5, 3, 4, 6], 
      label: 'Inadimplentes',
      backgroundColor: '#1E3A8A', // Azul escuro
      borderColor: '#1E3A8A', // Azul escuro
      borderWidth: 1
    }
  ];
  inadimplentesLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr'];

  contasPagarData: ChartDataset[] = [
    {
      data: [2, 5, 1, 3], 
      label: 'Contas a Pagar',
      backgroundColor: '#F97316', // Laranja
      borderColor: '#F97316', // Laranja
      borderWidth: 1
    }
  ];
  contasPagarLabels: string[] = ['Hoje', 'Amanhã', 'Próx. Semana', 'Próx. Mês'];

  estoqueBaixoData: ChartDataset[] = [
    {
      data: [10, 20, 30], 
      label: 'Produtos com Estoque Baixo',
      backgroundColor: '#1E3A8A', // Azul escuro
      borderColor: '#1E3A8A', // Azul escuro
      borderWidth: 1
    }
  ];
  estoqueBaixoLabels: string[] = ['Produto A', 'Produto B', 'Produto C'];

  // Novos gráficos

  contasReceberData: ChartDataset[] = [
    {
      data: [10, 15, 20, 25],
      label: 'Contas a Receber',
      backgroundColor: '#10B981', // Verde
      borderColor: '#10B981', // Verde
      borderWidth: 1
    }
  ];
  contasReceberLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr'];

  produtosVencimentoData: ChartDataset[] = [
    {
      data: [3, 6, 9],
      label: 'Produtos Próximos do Vencimento',
      backgroundColor: '#F59E0B', // Amarelo
      borderColor: '#F59E0B', // Amarelo
      borderWidth: 1
    }
  ];
  produtosVencimentoLabels: string[] = ['Produto X', 'Produto Y', 'Produto Z'];

  vendasCategoriaData: ChartDataset[] = [
    {
      data: [15, 25, 30, 40],
      label: 'Vendas Categoria',
      backgroundColor: '#2563EB', // Azul claro
      borderColor: '#2563EB', // Azul claro
      borderWidth: 1
    }
  ];
  vendasCategoriaLabels: string[] = ['Jan', 'Fev', 'Mar', 'Abr'];

  // Configuração dos gráficos
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,  // Garantir que a altura e largura sejam controladas
    plugins: {
      legend: { position: 'top' }
    }
  };
}
