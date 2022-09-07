document.addEventListener('DOMContentLoaded', function () {
    App();
});



function App() {
    let cancel = document.querySelector('.cancel')
    cancel.addEventListener('click', function () {
        document.querySelector('.poem').remove()
        document.querySelector('.content').style.display = "flex"
        cancel.style.display = "none"
    })
    fetchData();
    document.querySelector('.likednav').addEventListener('click', function () {
        document.querySelector('.card').style.display = "none"
        document.querySelector('.likedd').style.display = "block"
    })
}


function fetchData() {

    fetch('https://www.poemist.com/api/v1/randompoems?size=100')
        .then(resp => {
            // console.log(resp)
            return resp.json()
        })
        .then(callBack)
        .catch(err => {
            console.log(err);
            setTimeout(fetchData, 10000)
        });
}

function addToHtml(cards, item) {
    let txt = item.content
    let previewLines = txt.slice(0, 297)
    let card = document.createElement('div');
    let prev = document.createElement('div');
    let info = document.createElement('div');
    let likes = document.createElement('div');
    let count = document.createElement('div');
    let click = document.createElement('div');

    card.className = "card"
    prev.className = "card-prev"
    info.className = "card-info"
    likes.className = "likes"
    count.className = "likes-count"
    click.id = "like"


    prev.addEventListener('click', function () {
        document.querySelector('.content').style.display = "none"
        displayOne(item)
    })

    click.addEventListener('click', function () {
        let txt = count.textContent.split(' ')
        let noOfLikes = parseInt(txt[0])
        if (click.textContent == "Like") {
            click.innerHTML = "unlike"
            noOfLikes += 1
            card.classList.add('likedd')

        } else {
            click.textContent = "Like"
            noOfLikes -= 1
            card.classList.remove('likedd')
        }
        count.innerHTML = `<b>${parseInt(noOfLikes)}</b> likes`
    })
    //Add html
    prev.innerHTML = previewLines
    count.innerHTML = `<b>${0}</b> likes`
    click.innerHTML = "Like"
    info.innerHTML = `
      <div class="card-title">${item.title}</div>
      <div class="card-artist">${item.poet.name}</div>
      `

    console.log(card)
    console.log(info)
    console.log(prev)
    console.log(likes)
    console.log(count)
    console.log(click)

    likes.append(count)
    likes.append(click)
    card.append(prev)
    card.append(info)
    card.append(likes)

    cards.append(card)


}

function displayOne(data) {
    document.querySelector('.cancel').style.display = "flex"
    let section = document.createElement('div')
    section.className = "poem"
    section.innerHTML = `
      <div class="poem-title">${data.title}</div>
      <div class="poem-author">${data.poet.name}</div>
      <div class="poem-content">${data.content.replaceAll('\n', '<br>')}</div>
      `
    document.querySelector('.container').append(section)
}
function callBack(data) {
    setTimeout(fetchData, 15000)
    let cards = document.querySelector(".cards")
    data.forEach(item => {
        console.log(item)
        addToHtml(cards, item)
    })
}