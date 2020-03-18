const { newMovies, willReleasedMovies } = require('../crawlers/movie/index');

async function requestHandler(requestText) {
	let responseText;
	let responseText2;
	switch (requestText) {
		case "本週新片":
			const mappedDataNew = [];
			const newMoviesData = await newMovies();
			newMoviesData.map((movie) => {
				mappedDataNew.push(`${movie.title} \n ${movie.url} \n\n`)
			})
			responseText = mappedDataNew.join('')
			return responseText;
		case "即將上映":
			const mappedDataFuture = [];
			const willReleasedMoviesData = await willReleasedMovies();

			willReleasedMoviesData.map((movie) => {
				mappedDataFuture.push(`${movie.title} \n ${movie.url} \n上映日期: ${movie.date ? movie.date : '尚無資料'}\n\n`)
			})

			// linebot 有限制回傳長度，因此太長的陣列要做處理 
			const slicedData = mappedDataFuture.slice(0, 20);
			const slicedData2 = mappedDataFuture.slice(20, 40);
			responseText = slicedData.join('');
			responseText2 = slicedData2.join('');

			return [responseText, responseText2];
		default:
			return "你好！\n我是 Kyle 電影報馬仔～ \n\n 輸入以下關鍵字以獲得最新電影訊息: \n\n 本週新片 -> 獲取本週新上映電影訊息 \n 即將上映 -> 獲取近期即將上映電影訊息"
	}
}

module.exports = {
	requestHandler
}