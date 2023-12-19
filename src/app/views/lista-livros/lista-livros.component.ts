import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/books-DTO';
import { LivrosService } from 'src/app/services/livros.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit , OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro

  constructor(
    private livrosService: LivrosService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  livrosResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = [];

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks.thumbnail,
      })
    })

    return livros
  }

  getLivroByName(){
    this. subscription = this.livrosService.getLivros(this.campoBusca).subscribe({
      //next: data => {
        //console.log("Next:", data);
      //},
      next: (items) => {
       this.listaLivros = this.livrosResultadoParaLivros(items)
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



