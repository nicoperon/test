document.addEventListener('DOMContentLoaded', function () {
    const addLikeButtons = document.getElementsByClassName('add-like');
    for (let i = 0; i < addLikeButtons.length; i++) {
        addLikeButtons[i].addEventListener('click', function () {
            if (!addLikeButtons[i].getAttribute('data-admin-ajax')) {
                console.error('no ajax url');
                return;
            }

            if (addLikeButtons[i].getAttribute('data-only-remove') !== null) {
                addLike(
                    addLikeButtons[i].getAttribute('data-admin-ajax'),
                    parseInt(addLikeButtons[i].getAttribute('data-post-id')),
                    addLikeButtons[i],
                    'unlike'
                );
                return;
            }

            addLike(
                addLikeButtons[i].getAttribute('data-admin-ajax'),
                parseInt(addLikeButtons[i].getAttribute('data-post-id')),
                addLikeButtons[i]
            );
        });
    }
});

const addLike = (adminAajaxUrl: string, postId: number, element: Element = null, changeType: 'auto' | 'like' | 'unlike' = 'auto') => {
    if (element !== null) {
        // add loader
        element.classList.add('add-like-loading');
    }

    fetch(adminAajaxUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
        },
        body: 'action=add_like&post_id=' + postId + '&change_type=' + changeType
    })
        .then(response => response.json())
        .then(data => {
            updateLikeCount(postId, data.data.likes);
            updateButtonStyle(postId, data.data.isLiked);
        })
        .catch((error) => {
            console.error('Error:', error);
        }).finally(() => {
            if (element !== null) {
                // remove loader
                element.classList.remove('add-like-loading');
            }
        });
}

const updateLikeCount = (post_id = null, newLikeCount = 0) => {
    let likeCounts: HTMLCollectionOf<Element>;
    if (post_id === null) {
        likeCounts = document.getElementsByClassName('like-count');
    } else {
        likeCounts = document.getElementsByClassName('like-count-' + post_id);
    }

    for (let i = 0; i < likeCounts.length; i++) {
        likeCounts[i].innerHTML = newLikeCount.toString();
    }
}

const updateButtonStyle = (post_id = null, isLiked = false) => {
    let likeButtons: HTMLCollectionOf<Element>;
    if (post_id === null) {
        likeButtons = document.getElementsByClassName('like-bouton');
    } else {
        likeButtons = document.getElementsByClassName('like-bouton-' + post_id);
    }
    for (let i = 0; i < likeButtons.length; i++) {
        if (isLiked) {
            likeButtons[i].classList.add('active');
        } else {
            likeButtons[i].classList.remove('active');
        }
    }
}