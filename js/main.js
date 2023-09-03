const itemsList = document.querySelector('.hero-section__list')
const template = document.querySelector('.template').content
const itemsFragment = document.createDocumentFragment()

async function getPosts () {
    let res = await fetch('https://blog-page-server.onrender.com/posts')
    let req = await res.json()
    renderPosts(req)
}

getPosts()

function renderPosts(data) {
    itemsList.innerHTML = null
    data.forEach((data) => {
        // const getDate = (date) => {
        //     const newDate = new Date(date);
        //     return `${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`;
        // };

        const newTemp = template.cloneNode(true);
        const {post_id, category_name, post_title, user_name} = data
        newTemp.querySelector(".hero-section__list-item").id = post_id
        newTemp.querySelector(".hero-section__item-data").textContent = 'September 24.2020'
        newTemp.querySelector(".hero-section__item-category").textContent = category_name
        newTemp.querySelector(".hero-section__item-title").textContent = post_title
        newTemp.querySelector(".hero-section__item-user").textContent = user_name
        itemsFragment.append(newTemp)
    })
    itemsList.append(itemsFragment)
}

const onCardClick = async (e) => {
    if(e.target.matches(".hero-section__item-delete")) {
        const currentCardId = e.target.closest(".hero-section__list-item").id;
        let req = await fetch(`http://localhost:8000/admin/delete/${currentCardId}`, {
            method: 'DELETE'
        })
        let res = req.json()
        console.log(res);
    }
}

if (itemsList) itemsList.addEventListener('click', onCardClick)