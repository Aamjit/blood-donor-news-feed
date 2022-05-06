const body = document.body;

// const options = {
// 	method: "GET",
// 	mode: "no-cors",
// 	headers: {
// 		"Access-Control-Allow-Origin": "*",
// 	},
// };

const API_KEY = "a03639739d544f699406cb44d904e883";
const date = new Date();
// const CORS = "https://cors-anywhere.herokuapp.com/";
let newElem = ``;

const renderMultipleElem = (data) => {
	for (var i = 0; i < data.length; i++) {
		let dataTitle = data[i].title;
		let dataArtUrl = data[i].url;
		let dataImgUrl = data[i].urlToImage;
		let dataDesc = data[i].description;

		// if (!dataImgUrl) continue;

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

	return newElem;
};

const loadingFunc = async () => {
	const API_URL = `https://newsapi.org/v2/top-headlines?q=covid&language=en&from=${date.toISOString()}&sortBy=popularity&apiKey=${API_KEY}`;

	const data = await fetch(API_URL);
	const response = await data.json();

	console.log(response);

	if (response || response != NULL) {
		console.log(response);

		let dataRetreived = renderMultipleElem(response.articles);

		document.querySelector("#render-area-box").innerHTML = dataRetreived;
	}
};

body.addEventListener("load", loadingFunc());
