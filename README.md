# Buscante
Projeto seguindo uma video aula no Alura sobre Rxjs com Angular

## Notas:

#### OPERADORES E UTILITARIOS DO RXJS PARA MANIPULAR OBSERVABLES:

1 - map: Transforma cada item emitido pelo Observable.

    import { from } from 'rxjs';
    import { map } from 'rxjs/operators';

    const numbers = from([1, 2, 3, 4, 5]);
    const squared = numbers.pipe(map(x => x * x));

    squared.subscribe(result => console.log(result));
    // Saída: 1, 4, 9, 16, 25

2 - filter: Filtra os itens emitidos com base em uma condição.

    import { from } from 'rxjs';
    import { filter } from 'rxjs/operators';

    const numbers = from([1, 2, 3, 4, 5]);
    const evens = numbers.pipe(filter(x => x % 2 === 0));

    evens.subscribe(result => console.log(result));
    // Saída: 2, 4

3 - merge: Combina múltiplos Observables em um único fluxo.

    import { interval, merge } from 'rxjs';

    const numbers = interval(1000);
    const letters = interval(1500);

    const combined = merge(numbers, letters);

    combined.subscribe(result => console.log(result));
    // Saída: 0, 0, 1, 1, 2, 3, ...

4 - concat: Concatena dois ou mais Observables.

    import { of, concat } from 'rxjs';

    const numbers = of(1, 2, 3);
    const letters = of('a', 'b', 'c');

    const combined = concat(numbers, letters);

    combined.subscribe(result => console.log(result));
    // Saída: 1, 2, 3, 'a', 'b', 'c'

5 - debounceTime: Adia a emissão de itens até que não haja novos itens emitidos por um determinado período.

    import { fromEvent } from 'rxjs';
    import { debounceTime, map } from 'rxjs/operators';

    const input = document.getElementById('search-input');
    const keyup = fromEvent(input, 'keyup');

    const debouncedInput = keyup.pipe(debounceTime(300));
    const search = debouncedInput.pipe(map(event => (event.target as HTMLInputElement).value));

    search.subscribe(query => console.log(`Search: ${query}`));

6 - tap: Permite realizar ações secundárias sem modificar o valor do item.

    import { of } from 'rxjs';
    import { tap, map } from 'rxjs/operators';

    const numbers = of(1, 2, 3);

    const squaredAndLogged = numbers.pipe(
    tap(x => console.log(`Antes do quadrado: ${x}`)),
    map(x => x * x),
    tap(x => console.log(`Depois do quadrado: ${x}`))
    );

    squaredAndLogged.subscribe(result => console.log(result));
    // Saída:
    // Antes do quadrado: 1
    // Depois do quadrado: 1
    // Antes do quadrado: 2
    // Depois do quadrado: 4
    // Antes do quadrado: 3
    // Depois do quadrado: 9

7 - pipe: Combina múltiplos operadores em uma única função encadeada.

    import { of } from 'rxjs';
    import { map, filter } from 'rxjs/operators';

    const numbers = of(1, 2, 3, 4, 5);

    const squaredEvens = numbers.pipe(
    filter(x => x % 2 === 0),
    map(x => x * x)
    );

    squaredEvens.subscribe(result => console.log(result));
    // Saída: 4, 16

8 - mergeMap (ou flatMap): Mapeia cada valor para um Observable e os mescla em um único fluxo.

    import { from } from 'rxjs';
    import { mergeMap } from 'rxjs/operators';

    const letters = from(['a', 'b', 'c']);

    const combined = letters.pipe(
    mergeMap(letter => from([letter, letter.toUpperCase()]))
    );

    combined.subscribe(result => console.log(result));
    // Saída: 'a', 'A', 'b', 'B', 'c', 'C'


#### PIPES DO ANGULAR:

1 - DatePipe: formata um valor de data de acordo com as regras de localidade.
2 - UpperCasePipe: transforma o texto em letras maiúsculas.
3 - LowerCasePipe: transforma o texto em letras minúsculas.
4 - CurrencyPipe: transforma um número em uma string de moeda, formatada de acordo com as regras de localidade.
5 - DecimalPipe: transforma um número em uma string com um ponto decimal, formatado de acordo com as regras de localidade.
6 - PercentPipe: transforma um número em uma string de porcentagem, formatada de acordo com as regras de localidade.

#### OPERADORES RXJS:

1 - switchMap - Operador de Transformação. Cancela requisições de observables anteriores, emitindo valores apenas do Observable projetado mais recentemente.
2 - filter - Operador de filtragem. Filtra os itens emitidos pelo Observable de origem, permitindo apenas aqueles que satisfaçam uma condição especificada.
3 - debounceTime - Operador de filtragem. Retorna um Observable que atrasa as emissões do Observable de origem pelo tempo especificado.
4 - distinctUntilChanged - Operador de filtragem. Retorna um Observable que emite todos os valores enviados pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.