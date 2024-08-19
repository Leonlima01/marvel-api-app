# marvel-api-app

Link do site: [https://marvel-comic-explorer.web.app/](https://marvel-comic-explorer.web.app/)

# IMPORTANTE

## 19/08: Por motivos do lado do servidor da API, a pesquisa de personagens está demorando muito mais do que deveria, e a tentativa de encontrar os quadrinhos não está recebendo nenhum dado do servidor. Infelizmente o site não funcionará como deveria até que o servidor da Marvel fique estável novamente.


 
## Descrição:

Esse projeto foi feito com objetivo de **praticar** o desenvolvimento web com `React` e utilização de `API`.
Foi utilizado a API da Marvel para buscar informação dos personagens e dos quadrinhos de cada personagem.

## Resumo:

- Pesquisar um personagem a partir do começo do nome. Ex: "Hul" encontra "Hulk", mas não "She-Hulk", já que ela não começa com "Hul".
- Ao clicar em um dos cards, uma lista com os quadrinhos que o mesmo personagem aparece é exibida.
- Cada quadrinho tem um titulo, quantidade de páginas e preço em dólares.

## Limitações:

- Alguns personagens não tem imagem, sendo então mostrado um card padrão de "Image not found".
- Devido a limitações da própria API, no máximo é apresentado 100 quadrinhos do personagem escolhido.
- A API-Key para fazer as solicitações é limitada para 3000 requisições por dia.

## Aprendido no desenvolvimento:

- `HTML5`
- `CSS`
- `Javascript`
- `React`
- Utilização de [API Marvel](https://developer.marvel.com/)

## Planejamento futuro

- Aumentar o limite de quadrinhos.
- Mostrar descrição do quadrinho.
- Pequeno QUIZ na página.
