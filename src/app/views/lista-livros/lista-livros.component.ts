import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/books-DTO';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivrosService } from 'src/app/services/livros.service';

const searchTime = 300

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  campoBusca = new FormControl()
  errorMessage: string = ""
  livrosResultado: LivrosResultado
  listaLivros: Livro[];
  //campoBusca: string = ''
  //subscription: Subscription
  //livro: Livro

  constructor(
    private livrosService: LivrosService
  ) { }

  ngOnInit() {

  }

//  ngOnDestroy() {
//    this.subscription.unsubscribe();
//  }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })

//  METODO ANTIGO, ANTES DE PASSAR A RESPONSABILIDADE DE CRIAR O OBJETO PARA A CLASSE
//    const livros: Livro[] = [];
//
//    items.forEach(item => {
//      livros.push(this.livro = {
//        title: item.volumeInfo?.title,
//        authors: item.volumeInfo?.authors,
//        publisher: item.volumeInfo?.publisher,
//        publishedDate: item.volumeInfo?.publishedDate,
//        description: item.volumeInfo?.description,
//        previewLink: item.volumeInfo?.previewLink,
//        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
//      })
//    })
//
//    return livros
  }

// natural usar o simbolo $ quando a variavel representa um observable
// observable que faz a requisicao dinamica somente com o ultimo valor digitado
livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
  debounceTime(searchTime),
  tap(() => {
    console.log('Fluxo inicial de dados');
  }),
  filter(
    (valorDigitado) => valorDigitado.length >= 3
  ),
  switchMap(
    (valorDigitado) => this.livrosService.getLivros(valorDigitado)
  ),
  map(resultado => this.livrosResultado = resultado),
  map(resultado => resultado.items ?? []),
  tap(console.log),
  map(items => this.listaLivros =   this.livrosResultadoParaLivros(items)),
  catchError(erro =>
    { console.log(erro);
      return throwError(() =>
      new Error(this.errorMessage = `Erro Desconhecido! Recarregue a aplicação!`));
    })
);

//  METODO DE BUSCA ANTIGO SEM A IMPLEMENTACAO DA BUSCA DINAMICA
//  getLivroByName(){
//    this. subscription = this.livrosService.getLivros(this.campoBusca).subscribe({
//      //next: data => {
//        //console.log("Next:", data);
//      //},
//      next: (items) => {
//        console.log("requisitei")
//        this.listaLivros = this.livrosResultadoParaLivros(items)
//      },
//      error: error => {
//        console.error("Error:", error);
//      },
//      complete: () => {
//        //console.log("Complete:", "completo chefe");
//      }
//    })
//  }

}



