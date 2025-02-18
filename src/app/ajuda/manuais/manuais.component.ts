import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manuais',
  templateUrl: './manuais.component.html',
  styleUrls: ['./manuais.component.css'],
    imports: [CommonModule],
    standalone: true // Isso é necessário para standalone components
})
export class ManuaisComponent {

  // Lista de manuais
  manuais = [
    { id: 1, titulo: 'Clientes', descricao: 'Cadastro, edição e listagem de clientes.' },
    { id: 2, titulo: 'Fornecedores', descricao: 'Cadastro, edição e listagem de fornecedores.' },
    { id: 3, titulo: 'Produtos', descricao: 'Cadastro, edição, listagem e controle de estoque.' },
    { id: 4, titulo: 'Vendas', descricao: 'Cadastro de vendas e geração de notas fiscais.' },
    { id: 5, titulo: 'Compras', descricao: 'Cadastro e acompanhamento de compras.' },
    { id: 6, titulo: 'Relatórios', descricao: 'Visualização de relatórios gerenciais e gráficos.' },
    { id: 7, titulo: 'Dashboards', descricao: 'Exibição de gráficos dinâmicos na tela inicial.' },
    { id: 8, titulo: 'Manuais', descricao: 'Seção dedicada aos manuais do sistema com exportação em PDF.' }
  ];

  // Exporta manual específico
  downloadPDF(manualId: number) {
    const manual = this.manuais.find(m => m.id === manualId);
    if (manual) {
      const pdf = new jsPDF();
      pdf.text(`Manual: ${manual.titulo}`, 10, 10);
      pdf.text(`Descrição: ${manual.descricao}`, 10, 20);
      pdf.save(`Manual_${manual.titulo}.pdf`);
    }
  }

  // Exporta todos os manuais em um único PDF
  downloadTodosPDFs() {
    const pdf = new jsPDF();
    let y = 10;

    this.manuais.forEach((manual) => {
      pdf.text(`Manual: ${manual.titulo}`, 10, y);
      y += 10;
      pdf.text(`Descrição: ${manual.descricao}`, 10, y);
      y += 15;
    });

    pdf.save('Manuais_Completos.pdf');
  }
}
