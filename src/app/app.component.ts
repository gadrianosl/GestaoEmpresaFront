import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Para navegação

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Adiciona suporte ao roteamento
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestao-comercial-ui';
}
