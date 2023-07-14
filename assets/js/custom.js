const loadNews = async (dataType) =>{
    const URL = `https://openapi.programming-hero.com/api/news/${dataType}`;
    try{
        const getCategories = await fetch(URL);
        const data = await getCategories.json();
        
        if(data.status){
            showCategories(data.data.news_category);
        } else {
            return alert('Sorry! right now there is no news available in this category.')
        }

    } catch (error){
        return alert(error);
    }
}

const showCategories = (categories) => {
    console.log(categories);
    const newsCategoryContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        console.log(category);
        const {category_id, category_name} = category;
        const categoryDiv = document.createElement('p');
        categoryDiv.classList.add('my-0')
        categoryDiv.innerHTML = `
            <a onclick="loadSingleCategory('${category_id}', '${category_name}')" class="text-decoration-none text-secondary cateogry-items">${category_name}</a>
        `;
        newsCategoryContainer.appendChild(categoryDiv);
    })
    
}

// const defaultNewsLoad = async(category_id) => {
//     const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
//     try{
//         const loadAllCategory = f
//     } catch (err) {

//     }
// }

const loadSingleCategory = async (category_id, category_name) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        const getSingleCategory = await fetch(URL);
        const data = await getSingleCategory.json();
        if(data.status){
            loadSingleCategoryNews(data.data, category_name);
        } else {
            return alert('Sorry! right now there is no news available in this category.')
        }
    } catch(err){
        return alert(err);
    }
}


const loadSingleCategoryNews = (currentCategory, category_name) => {
    console.log(currentCategory, category_name);
    const msgContainer = document.getElementById('category-msg');
    msgContainer.classList.add('container-fluid', 'p-3', 'bg-body-tertiary', 'text-center');
    msgContainer.innerHTML = `
        <p> ${currentCategory.length} items found in this category ${category_name}. </p>
    `;
    const cardContainer = document.getElementById('newscontainer');
    cardContainer.innerHTML = '';

    currentCategory.forEach((singleNewsCard) => {
        const {author, _id, rating, thumbnail_url, title, total_view} = singleNewsCard;
        const {img, name, published_date} = author;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3');
        newsDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae mollitia dicta odit aut quia atque temporibus quas corrupti reprehenderit, enim accusamus pariatur recusandae in.
                            <br><br>
                            Facere, corrupti at voluptatem consequatur voluptas dolores incidunt. Cum natus culpa possimus iure mollitia. Facilis a nisi omnis, provident ea laborum reiciendis magnam accusantium autem eos.
                        </p>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-center align-items-center gap-2">
                                <img class="author-pic rounded-circle" src="${img}">
                                <div>
                                    <p class="m-0">
                                        ${name}
                                    </p>
                                    <span>
                                        ${published_date}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <i class="fa-solid fa-eye me-1"></i>
                                <span>${total_view}</span>
                            </div>
                            <div>
                                <span>
                                    ${rating.number}
                                </span>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div>
                                <i onclick="singleNewsLoad('${_id}')" class="fa-solid fa-arrow-right text-end arrow" data-bs-toggle="modal" data-bs-target="#single-news-modal"></i>
                            </div>
                        <div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(newsDiv);
    })
}

const singleNewsLoad = async (newsId) => {
    console.log(newsId);
    const URL = `https://openapi.programming-hero.com/api/news/${newsId}`;

    try{
        const loadNews = await fetch(URL);
        const data = await loadNews.json();
        if(data.status){
            loadSingleNews(data.data[0]);
        } else {
            return alert('Invalid Access');
        }
    } catch(err){
        console.log(err);
    }
}

const loadSingleNews = (news) => {
    console.log(news);
    const modalhead = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');
    const {author, details, image_url, thumbnail_url, title, total_view
    } = news;
    const {img, name, published_date} = author;
    modalhead.innerHTML = `
        <div class="d-flex gap-2 align-items-center">
            <img class="author-pic rounded-circle" src ="${img}"> <span>${name}</span>
        </div>
        <span> 
            <i class="fa-solid fa-eye me-1"></i> 
            ${total_view} 
        </span>
    `;

    modalBody.innerHTML =`
        <div class="d-flex flex-column">
            <h5>
                ${title}
            </h5>
            <img src="${thumbnail_url}" class="mx-auto">
        </div>
        <div>
            <p class="my-2">
                ${details}
            </p>
        </div>
    `;
    const viewTag = document.createElement('span');
    viewTag.innerText = `${published_date}`;
    modalFooter.appendChild(viewTag);
}

loadSingleCategory('01', 'Breaking News');