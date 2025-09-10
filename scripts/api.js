const nome = document.getElementById("nome");
const btn = document.querySelector("#btn");
const p = document.querySelector("#info");
const enviar = document.getElementById("enviar");
const capa = document.getElementById("capa");
const salvar = document.getElementById("local");


function criarTexto(nome, texto, i){
    if (!texto){
        p.children[i].textContent = nome + "Não encontrado";
        p.children[i].style.color = "purple";
    }
    else {p.children[i].textContent = nome + texto; 
        p.children[i].style.color = "black";}
}


async function buscarLivros(nome, cont) {

    try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${nome}`);
// Processar e exibir os resultados (data) aqui
    const data = await response.json();
    
    if(salvar.checked) localStorage.setItem(data.items[cont].volumeInfo.title, data.items[cont].selfLink)

    btn.max = data.items.length - 1
    if (cont > data.items.length - 1) {
        alert("edição inexistente."); 
        return 0;
    }

    return data.items[cont].volumeInfo;
  } catch (error) {
    alert('Livro não encontrado', error);
  }
}


enviar.addEventListener("click", async function() {
    const cont = btn.value;
    const livro = await buscarLivros(nome.value, cont);

    document.querySelector("h3").textContent = livro.title;
    criarTexto("Autor: ", livro.authors, 2);
    criarTexto("SubTítulo: ", livro.subtitle, 3);
    criarTexto("Estilo: ", livro.categories, 4);
    criarTexto("Descrição: ", livro.description , 5);
    criarTexto("Editora: ", livro.publisher, 6);
    criarTexto("Data da edição: ", livro.publishedDate, 7);
    criarTexto("N° de páginas: ", livro.pageCount, 8);
    criarTexto("Frase: ", livro.textSnippet, 9); 

    if (livro.industryIdentifiers) criarTexto("ISBN: ", livro.industryIdentifiers[0].identifier, 10);
    if(!livro.imageLinks){
        capa.src = "https://www.ihgppb.com.br/static/img/livro/nocapa.jpg"
    }
    else capa.src = livro.imageLinks.thumbnail;
    });