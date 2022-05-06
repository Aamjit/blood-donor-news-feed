"use strict";

const body = document.body;
let pageCount = 1;
let nextPage = 0;
let nearToBottom = 100;

const options = {
	method: "GET",
	mode: "cors",
};

const API_KEY = "pub_69072a7e861c186ddcb0fe676e79bbea5179";

let newElem = ``;
const renderELem = document.querySelector("#render-area-box");

const storeMultiElem = (response) => {
	for (var i = 0; i < response.results.length; i++) {
		let dataTitle = response.results[i].title;
		let dataArtUrl = response.results[i].link;
		let dataImgUrl = response.results[i].image_url;
		let dataDesc = response.results[i].description;

		if (!dataImgUrl) continue;

		// console.log(dataTitle, dataArtUrl, dataImgUrl, dataDesc);
		newElem += `
				<div class="container">
					<div class="item-img">
						<img src="${dataImgUrl}" alt="image not avialable😕" class="data-img" loading="lazy" />
					</div>
					<div class="text-item">
						<a href="${dataArtUrl}" class="data-title">${dataTitle}</a>
						<p class="data-desc">${dataDesc}</p>
					</div>
				</div>
			`;
	}
	return;
};

const loadingFunc = async (pageCount) => {
	const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=health,politics&page=${pageCount}`;

	const data = await fetch(API_URL, options);
	const response = await data.json();
	nextPage = parseInt(response.nextPage);

	if (response || !NULL) {
		console.log(response);

		storeMultiElem(response);
	}

	console.log(newElem);
	renderELem.appendChild(
		new DOMParser().parseFromString(newElem, "text/html")
	);

	renderELem.addEventListener("scroll", function (event) {
		if (element.scrollHeight - element.scrollTop === element.clientHeight) {
			if (nextPage) {
				newElem = ``;
				loadingFunc(nextPage);
				renderELem.appendChild = new DOMParser().parseFromString(
					newElem,
					"text/html"
				);
			}
		}
	});
};

body.addEventListener("load", loadingFunc(pageCount));
