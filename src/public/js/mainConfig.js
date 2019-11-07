function dropdown() {
    $('.nav-item').mouseover(function () {
        $(this).find('.dropdown-list').show();
    });
    $('.nav-item').mouseout(function () {
        $(this).find('.dropdown-list').hide();
    });
}

function carousel() {
    let itemWidth = 313;
    let itemNumber = 16;
    let carouselWidth = $('.top-movie-list').width();
    let itemsInOneStep = Math.floor(carouselWidth/itemWidth);
    let maxCount = Math.floor(itemNumber/itemsInOneStep)-1;
    let step = itemsInOneStep*itemWidth + 10;

    let counter = 0;
    $('.top-movie-list').find('.prev-btn').off('click').on('click', function (e) {
        e.preventDefault();
        if (counter === 0) {
            return false;
        }
        else {
            counter--;
            $('.top-movie-wrapper').animate({
                left: "+=" + step
            }, 800);
        }
    })
    $('.top-movie-list').find('.next-btn').off('click').on('click', function (e) {
        e.preventDefault();
        if (counter === maxCount) {
            counter = 0;
            $('.top-movie-wrapper').animate({
                left: 0
            }, 1000);
            return false;
        }
        else {
            counter++;
            $('.top-movie-wrapper').animate({
                left: "-=" + step
            }, 800);
        }
    })
};

function autoCarousel() {
    $('.top-movie-list').find('.next-btn').click();
}

function watchAndTrailerButton(trailerLink, movieLink) {
    $('.watch-btn').on('click', function (e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.player-window').show();
        $('.player-window').find('.trailer-btn').show();
        $('.player-window').find('.watch-btn').hide();

        $('.player-window').find('video source').attr('src', `http://localhost:3000${movieLink}`);
        $('.player-window').find('video')[0].load();
    });

    $('.trailer-btn').on('click', function (e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.player-window').show();
        $('.player-window').find('.trailer-btn').hide();
        $('.player-window').find('.watch-btn').show();

        $('.player-window').find('video source').attr('src', `http://localhost:3000${trailerLink}`);
        $('.player-window').find('video')[0].load();
    });
}

function popUpModals() {
    $('.summary-btn').on('click', function (e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.movie-summary').show();
        $('.player-window').find('video')[0].pause();
    });

    $('.download-btn').on('click', function (e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.movie-download').show();
    });

    $('.pop-up-bg').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-window').hide();
        $('.player-window').find('video')[0].pause();
    });
}

function popDownModals() {
    $('.close-movie-details-modal').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-window').hide();
        $('.player-window').find('video')[0].pause();
    });
}

function showHideCommentButton() {
    let inputComment = $('.pop-up-window').find('form #comment-content');
    inputComment.focus(function (e) {
        $('.pop-up-window').find('.comment-btns').show();
    });
    inputComment.blur(function (e) {
        if ($(this).val() === "") {
            $('.pop-up-window').find('.comment-btns').hide();
        }
    });
}

function sendAddCommentRequest(e) {
    e.preventDefault();
    let commentContent = $('.pop-up-window').find('form #comment-content').val();
    let movieId = $('.pop-up-window').find('form #movie-id').val();
    $('.pop-up-window').find('form #comment-content').val('');
    $('.pop-up-window').find('form .comment-btns').hide();
    $.post("http://localhost:3000/comment/add-new", {
        commentContent: commentContent,
        movieId: movieId
    }, function (data) {
        let commentListElem = $('.comment-list');
        let avatar = $('#comment-posible').find('.avatar img').attr('src');
        let userName = $('#comment-posible').find('.comment-details .user-name').text();
        commentListElem.prepend(`<div class="comment">
        <div class="avatar">
            <img src="${avatar}" alt="">
        </div>
        <div class="comment-details">
            <div class="user-name">${userName}</div>
            <div class="comment-content">
                ${commentContent}
            </div>
        </div>
        </div>`);
    });
}

function addNewComment() {
    $('.pop-up-window').find('.up-btn').on('click', function (e) {
        sendAddCommentRequest(e);
    });

    $('.pop-up-window').find('form #comment-content').on('keydown', function (e) {
        if (e.which === 13) {
            sendAddCommentRequest(e);
        }
    });
}