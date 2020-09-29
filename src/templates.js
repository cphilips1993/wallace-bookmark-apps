import $ from 'jquery';
import store from './store';
import api from './api';

/*******TEMPLATES***************** */

function generateHomeTemplate() {
    console.log('header template ran');
    // this function will be for New bookmark button and filer by drop down box
    return `<h1>Bookmark App</h1>
    <div class="header-container">
        <form class="new-bookmark">
        <button>New Bookmark!</button>
        <p>Filter</p>
        <select class="ratingFilter">
        <option value="1">1 or higher</option>
        <option value="2">2 or higher</option>
        <option value="3">3 or higher</option>
        <option value="4">4 or higher</option>
        <option value="5">5 + </option>
        </select>
    </div>
    </form>` + generateBookmarks();
}

function addBookmarkTemplate() {
    return `
  <section class="addBookmarkSection">
      <form class="addBookmarkForm" id="addBookmarkForm">
        <h3>Add New Bookmark</h3>
        <div>
            <label for="add-bookmark-url">Enter Url:</label>
            <input type="text" class="full-width" id="add-bookmark-url" name="url" required>
        </div>
        <div>
            <label for="add-bookmark-title">Enter Title:</label>
            <input type="text" class="full-width" id="add-bookmark-title" name="title" required>
        </div>
        <div class="rating-dropdown">
        Rating:
            <select class="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
        </div>
        
        <div class="description-div">
            <label for="bookmark-textarea" class="desc-label">Add a description: (Optional)</label>
            <textarea name="desc" id="bookmark-textarea" rows="5"></textarea>
        </div>
        <div class="form-buttons" id="form-buttons">
          <input type="button" class="general-btn" value="Cancel" id="cancel-add-bookmark">
          <input type="button" class="general-btn" value="Create" id="submit-newBookmark">
        </div>
      </form>
    </section>`;
}

const generateBookmarks = () => {
    let content = '';
    let bookmarks = filterByRating();
    for (let i in bookmarks) {
        content += `
        <div>
        <h4>${bookmarks[i].title}</h4>
        <a href='${bookmarks[i].url}'>${bookmarks[i].url}</a>
        <p>Rating: ${bookmarks[i].rating}</p>
        <p>description: ${bookmarks[i].description}</p>
        </div>`;
    }
    return content;
};

/************EVENT LISTENERS***************** */

function newBookmarkButtonSubmit() {

    $('.main').submit((event) => {
        event.preventDefault();
        console.log('New Bookmark Button Pressed');
        store.store.adding = true;
        let content = addBookmarkTemplate();
        $('.main').html(content);
        newBookmarkSubmitHandler();
        newBookmarkCancelHandler();
    });
}

const newBookmarkSubmitHandler = function () {
    // on newbookmark submit btn
    $('#submit-newBookmark').on('click', (event) => {
        event.preventDefault();
        let obj = {
            url: $('#add-bookmark-url').val(),
            title: $('#add-bookmark-title').val(),
            rating: $('.rating').val(),
            description: $('#bookmark-textarea').val()
        };

        store.store.bookmarks.push(obj);


        console.log(obj.url);
        console.log(obj.title);
        console.log(obj.rating);
        console.log(obj.description);
        $('.main').html('');
        render();
    });
};

const newBookmarkCancelHandler = function () {
    $('#cancel-add-bookmark').on('click', (event) => {
        event.preventDefault();
        $('.main').html('');
        render();
    });

};

const newBookmarkHandler = () => {
    // $('.main').on('submit', '.newBookmark', () => {
    //     store.store.adding = !store.store.adding;
    //     render();
    // });
};

// const deleteHandler = () => {
//     $('.main').on('click', '.bookmark-delete', function (e) {
//         const id = getBookmarkItemID(e.currentTarget);
//         api
//             .deleteBookmark(id)
//             .then(() => {
//                 store.deleteBookmark(id);
//                 render();
//             })
//             .catch((err) => {
//                 store.setError(err.message);
//             });
//     });
// };

const getBookmarkItemID = function (bookmark) {
    return $(bookmark).closest('.bookmark-item').data('bookmark-id');
};

const expandToggleHandler = () => {};

function filterByRating() {
    let bookmarkRating = store.store.filter;
    return store.store.bookmarks.filter((item) => {
        return item.rating >= bookmarkRating;
    });
}

const filterRatingHandler = () => {
    $('.ratingFilter').on('change', event => {
        store.store.filter = $('.ratingFilter').val();
        console.log($('.ratingFilter').val());
        render();
    });
};

/*************************RENDER********************** */
function render() {
    $('.main').html(generateHomeTemplate());
    bindEventHandlers();
}




/*************EXPORT*********************** */
function bindEventHandlers() {
    newBookmarkButtonSubmit();
    filterRatingHandler();
    newBookmarkHandler();
    newBookmarkSubmitHandler();
}
export default {
    bindEventHandlers,
    render,
};