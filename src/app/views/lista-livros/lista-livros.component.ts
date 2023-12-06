import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit , OnDestroy {

  listaLivros: [];
  nameValue: string;
  subscription: Subscription;

  constructor(
    private livrosService: LivrosService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLivroByName(){
    this. subscription = this.livrosService.getLivros(this.nameValue).subscribe({
      next: data => {
        console.log("Next:", data);
      },
      error: error => {
        console.error("Error:", error);
      },
      complete: () => {
        console.log("Complete:", "completo chefe");
      }
    })
  }

}



