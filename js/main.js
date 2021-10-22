$(document).ready(function() {
	var $imagesCarousel = $('.carouselOfImages').flickity({
	  contain: true,
	  autoPlay: true,
	  wrapAround: true,
	  friction: 0.3
	});
	function resizeCells() {
	  var flkty = $imagesCarousel.data('flickity');
	  var $current = flkty.selectedIndex
	  var $length = flkty.cells.length
	  if ($length <='5') {
		 $imagesCarousel.flickity('destroy');
	  }
	  $('.carouselOfImages .carouselImage').removeClass("nextToSelected");
	  $('.carouselOfImages .carouselImage').eq($current-1).addClass("nextToSelected");
	  if ($current+1 == $length) {
		 var $endCell = "0"
	  } else {
		 var $endCell = $current+1
	  }
		$('.carouselOfImages .carouselImage').eq($endCell).addClass("nextToSelected");
	  };
	resizeCells();
	
	$imagesCarousel.on('scroll.flickity', function() {
		 resizeCells();
	  });
	  
	  
	  
	  
	  
	$(".carouselImage img").click(function() { 
	  var $this = $(this);
	  var imageID = $this.attr('data-tab');
	  var imageSrc = $this.attr('src');
	  
	  $('.' + imageID).removeClass('hide');
	  $('.' + imageID + ' .product-detail-image img').attr('src', imageSrc);
	});
	
	$('.product-detail-close,.product-detail').on('click', function() {
	  $('.product-detail').addClass('hide');
	});
	
	  $('.modal-video').on('hidden.bs.modal', function (e) {
		 $('.modal-video iframe').attr('src', $('.modal-video iframe').attr('src'));
	  });
	
	autoPlayYouTubeModal();
	
	  function autoPlayYouTubeModal() {
			var trigger = $("body").find('[data-the-video]');
			trigger.click(function () {
				 var theModal = $(this).data("target"),
					  videoSRC = $(this).attr("data-the-video"),
					  videoSRCauto = videoSRC + "&autoplay=1";
				 $(theModal + ' iframe').attr('src', videoSRCauto);
				 $(theModal + ' button.close').click(function () {
					  $(theModal + ' iframe').attr('src', videoSRC);
				 });
				 $('.modal-video').click(function () {
					  $(theModal + ' iframe').attr('src', videoSRC);
				 });
			});
	  }
	
	$(window).on('load resize', function(){
	  var $window = $(window);
	  $('.modal-fill-vert .modal-body > *').height(function(){
			return $window.height()-60;
		 });
	  }); 
	});
	
	
	
	  
	
	






var elList = document.querySelector('.list');
var elForm = document.querySelector('.form');
var elSelect = document.querySelector('.select');
let elSearchInput = document.querySelector('.search');
let elSortSelect = document.querySelector('.js-sort');
let elBookmarks = document.querySelector('.bookmark__list');
let elFilmModal = document.querySelector('.modal__show');
const  elFilmHeadingModal = document.querySelector('.modal__heading')
const  elFilmPosterModal = document.querySelector('.modal__poster')




function generateGenres(films, node) {
	var resultGaners = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!resultGaners.includes(genre)) {
				resultGaners.push(genre);
			}
		});
	});

	resultGaners.forEach((genre) =>{
		const newOption = document.createElement('option');
		newOption.value = genre; 
		newOption.textContent = genre;
		node.appendChild(newOption)
	})

}


function renderFilms(arr, node) {
	elList.innerHTML = null;
	node.innerHTML = null;
	arr.forEach((film) => {
		if (film.genres.includes(elSelect.value)) {
			var newLi = document.createElement('li');
			var newHeading = document.createElement('h3');
			var newImage = document.createElement('img');
			var newParagraph = document.createElement('p');
			var newTime = document.createElement('time');
			let bookMarkBtn = document.createElement('button');
			let newMoreBtn = document.createElement('button');


			newHeading.textContent = film.title;
			newParagraph.textContent =
				film.overview.split(' ').slice(0, 10).join(' ') + '...';
			bookMarkBtn.textContent = 'Bookmark'
			newMoreBtn.textContent = 'Modal'

			newLi.setAttribute('class', 'list__item film mb-3 text-center shadow');
			newHeading.setAttribute('class', 'film__heading ');
			newImage.setAttribute('class', 'film__image mb-1');
			newImage.setAttribute('src', film.poster);
			newImage.setAttribute('alt', film.title + ' poster');
			newImage.setAttribute('width', '300');
			newImage.setAttribute('height', '300');		
			bookMarkBtn.setAttribute('class', 'film__book btn mx-1 my-1');
			newMoreBtn.setAttribute('class', 'more__button btn');
			bookMarkBtn.dataset.filmId = film.id;
			newMoreBtn.dataset.filmId = film.id;

			newLi.appendChild(newHeading);
			newLi.appendChild(newImage);
			newLi.appendChild(newParagraph);
			newLi.appendChild(newTime);
			newLi.appendChild(bookMarkBtn);
			newLi.appendChild(newMoreBtn);


			node.appendChild(newLi);
		}
	});
}


const bookMarks = []
function renderBookmarks(arr, node) {
	node.innerHTML = null;

	arr.forEach((film) => {
		const bookmarkLi = document.createElement('li');
		const bookmarksImage = document.createElement('img');
		const bookmarkHeading = document.createElement('h2');
		const bookmarkBtn = document.createElement('button');

		bookmarkHeading.textContent = film.title;

		bookmarkBtn.textContent = 'Delete';
		bookmarkBtn.dataset.filmId = film.id;

		bookmarksImage.setAttribute('class', 'film__image m-1');
		bookmarksImage.setAttribute('src', film.poster);
		bookmarksImage.setAttribute('alt', film.title + ' poster');
		bookmarksImage.setAttribute('width', '300');
		bookmarksImage.setAttribute('height', '300');

		bookmarkLi.setAttribute('class', 'list__item mb-3 text-center shadow');
		bookmarkHeading.setAttribute('class', 'bookmarks__heading');
		bookmarkBtn.setAttribute('class', 'bookmarks__btn--del btn')

		bookmarkLi.appendChild(bookmarksImage);
		bookmarkLi.appendChild(bookmarkHeading);
		bookmarkLi.appendChild(bookmarkBtn);

		node.appendChild(bookmarkLi);

	})

}

// Bookmarks
elBookmarks.addEventListener('click', (evt) =>{
	if(evt.target.matches('.bookmarks__btn--del')) {
		const filmId = evt.target.dataset.filmId;
		const foundBookmarks = bookMarks.find((film)=> film.id === filmId);

		bookMarks.splice(foundBookmarks, 1);
		renderBookmarks(bookMarks, elBookmarks)
	}
})

// Modla--show
elFilmModal.addEventListener('click', (evt) =>{
	const isTargetRemover = evt.target.matches('.modal__show')|| evt.target.matches('.modal__close-button')

	if (isTargetRemover){
		evt.currentTarget.classList.remove('modal--show');
	}
})
 
function renderFilmModal (film) {
	elFilmHeadingModal.textContent = film.title;
	elFilmPosterModal.src = film.poster
}


elList.addEventListener('click', (evt) => {
	const isBookMarkBtn = evt.target.matches('.film__book');
	const isMoreBtn = evt.target.matches('.more__button');


	if (isBookMarkBtn) {
		const filmId = evt.target.dataset.filmId;

		const foundFilm = films.find((row) => row.id === filmId);
		if (!bookMarks.includes(foundFilm)) {
			bookMarks.push(foundFilm)
			renderBookmarks(bookMarks, elBookmarks);
		}
	}else if (isMoreBtn) {
		const filmId = evt.target.dataset.filmId;

		const foundFilm = films.find((row) => row.id === filmId);
		elFilmModal.classList.add('modal--show');
		renderFilmModal(foundFilm); 
	}

});

const sortFns = {
	0:(a, b) => {
		if (a.title < b.title){
			return -1
		}
		if (a.title > b.title) {
			return 1
		}
		return 0
	},

	1: (a, b) => {
		if (a.title < b.title){
			return 1
		}
		if (a.title > b.title) {
			return -1
		}
		return 0
	},

	2: (a, b) => a.release_date - b.release_date,
	3: (a, b) => b.release_date - a.release_date
}

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const genreValue = elSelect.value;
	const searchValue = elSearchInput.value.trim();
	const sortValue = elSortSelect.value;
	const newRegx = new RegExp(searchValue, 'gi');
	
	let filteredFilms = [];
	
	if(genreValue === 'all' && !searchValue) {
		filteredFilms = films.filter((movie)=> movie.title.match(newRegx));
	} else if (genreValue !== 'all') {
		filteredFilms = films
		.filter((film)=> film.genres.includes(genreValue))
		.filter((movie)=> movie.title.match(newRegx))
	}
	else{
		filteredFilms = films;
	}

	filteredFilms.sort(sortFns[sortValue])

	renderFilms(filteredFilms, elList);
})


renderFilms(films, elList);
generateGenres(films, elSelect);