const puppeteer = require('puppeteer');
const { AT_MOVIE_NEW_URL, AT_MOVIE_WILL_RELEASED_URL } = require('../../constant');

// 本週上映
async function newMovies() {
	try {
		const browser = await puppeteer.launch({
			args: [
				'--no-sandbox'
			]
		});
		const page = await browser.newPage();
		await page.goto(AT_MOVIE_NEW_URL, { waitUntil: 'networkidle2' });
		const data = await page.evaluate(() => {
			var result = [];
			let titles = document.querySelectorAll('div.filmTitle > a');
			for (let i = 0; i < titles.length; i++) {
				result.push({
					title: titles[i].innerText,
					url: titles[i].href
				})
			}
			return result;
		});
		await browser.close();;
		return data;
	} catch (err) {
		throw new Error(err);
	}
}

// 新片快報
async function willReleasedMovies() {
	try {
		const browser = await puppeteer.launch({
			args: [
				'--no-sandbox'
			]
		});
		const page = await browser.newPage();
		await page.goto(AT_MOVIE_WILL_RELEASED_URL, { waitUntil: 'networkidle2' });
		const data = await page.evaluate(() => {
			var result = [];
			let moviesList = document.querySelectorAll('ul.filmListAll > li');
			for (let i = 0; i < moviesList.length; i++) {
				result.push({
					title: moviesList[i].querySelector('div.filmtitle > a').innerText,
					url: moviesList[i].querySelector('div.filmtitle > a').href,
					date: moviesList[i].querySelector('div.runtime').innerText
				})
			}

			return result;
		});
		await browser.close();;
		return data;
	} catch (err) {
		throw new Error(err);
	}
}
module.exports = {
	newMovies,
	willReleasedMovies
}