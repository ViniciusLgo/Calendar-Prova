const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span");

// obtendo nova data, ano e mês atuais
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// armazenando o nome completo de todos os meses em um array
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = () => {
    let primeiroDiaDoMes = new Date(currYear, currMonth, 1).getDay(), // obtendo o primeiro dia do mês
        ultimaDataDoMes = new Date(currYear, currMonth + 1, 0).getDate(), // obtendo a última data do mês
        ultimoDiaDoMes = new Date(currYear, currMonth, ultimaDataDoMes).getDay(), // obtendo o último dia do mês
        ultimaDataDoUltimoMes = new Date(currYear, currMonth, 0).getDate(); // obtendo a última data do mês anterior

    let liTag = "";

    for (let i = primeiroDiaDoMes; i > 0; i--) { // criando li dos últimos dias do mês anterior
        liTag += `<li class="inativo">${ultimaDataDoUltimoMes - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimaDataDoMes; i++) { // criando li de todos os dias do mês atual
        // adicionando a classe ativo à li se o dia atual, mês e ano corresponderem
        let eHoje = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "ativo" : "";
        liTag += `<li class="${eHoje}">${i}</li>`;
    }

    for (let i = ultimoDiaDoMes; i < 6; i++) { // criando li dos primeiros dias do próximo mês
        liTag += `<li class="inativo">${i - ultimoDiaDoMes + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passando o mês e ano atuais como texto da currentDate
    daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => { // obtendo ícones anterior e próximo
    icon.addEventListener("click", () => { // adicionando evento de clique em ambos os ícones
        // se o ícone clicado for o ícone anterior, então decrementa o mês atual em 1, senão incrementa em 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // se o mês atual for menor que 0 ou maior que 11
            // criando uma nova data com o ano e mês atuais e passando como valor da data
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // atualizando o ano atual com o ano da nova data
            currMonth = date.getMonth(); // atualizando o mês atual com o mês da nova data
        } else {
            date = new Date(); // passando a data atual como valor da data
        }
        renderCalendar(); // chamando a função renderCalendar


        
    });
    
});

