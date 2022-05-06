const body = document.body;

const API_KEY = "9Hhgb14EpX5vTuXRrYxppi5b1r7za_wQ_VT7dsZ8IT4";
let newElem = ``;

const options = {
	headers: {
		"x-api-key": "9Hhgb14EpX5vTuXRrYxppi5b1r7za_wQ_VT7dsZ8IT4",
	},
};

const renderMultipleElem = (data) => {
	for (var i = 0; i < data.length; i++) {
		let dataTitle = data[i].title;
		let dataArtUrl = data[i].link;
		let dataImgUrl = data[i].media;
		let dataDesc = data[i].summary;

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

	return newElem;
};

const loadingFunc = async () => {
	const API_URL = `https://api.newscatcherapi.com/v2/search`;

	await fetch(
		`https://api.newscatcherapi.com/v2/search?q=covid&lang=en&from=${Date.now()}`,
		options
	)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then((data) => {
			let dataRetreived = renderMultipleElem(data.articles);
			document.querySelector("#render-area-box").innerHTML =
				dataRetreived;
		})
		.catch((err) => {
			console.error("Something happened.", err);
		});
};

body.addEventListener("load", loadingFunc());
