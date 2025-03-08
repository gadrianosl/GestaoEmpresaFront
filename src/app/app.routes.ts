import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ProdutoComponent } from './produtos/produto.component';
import { ComprasComponent } from './compras/compras.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { ManuaisComponent } from './ajuda/manuais/manuais.component';
import { VendaComponent } from './vendas/vendas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Definir a tela inicial corretamente
    { path: 'clientes', component: ClientesComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'produtos', component: ProdutoComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'vendas', component: VendaComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'relatorios', component: RelatoriosComponent },
    { path: 'ajuda', component: AjudaComponent },
    { path: 'ajuda/manuais', component: ManuaisComponent }, // Adicionar rota para manuais
    { path: '**', redirectTo: '' } // Se a rota não existir, volta para a tela inicial
];
