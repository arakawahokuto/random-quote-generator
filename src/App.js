import { useEffect, useState } from 'react';
import './reset.css';
import './App.css';

const App = () => {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [currentDate, setCurrentDate] = useState("");
	const [dateTime, setDateTime] = useState("");

	// ランダムな名言を取得
	const fetchQuote = async () => {
		try {
			// Node.jsサーバーにデータを要求
			const response = await fetch("http://localhost:4000/api/quote");
			if (!response.ok) {
				throw new Error("名言の取得に失敗しました") // レスポンスが失敗した場合のエラー
			}
			const data = await response.json();
			setQuote(data[0].meigen); // 名言をReactの状態に保存
    	setAuthor(data[0].auther); // 著者名をReactの状態に保存
		} catch (error) {
			console.error("名言の取得中にエラーが発生しました:", error.message);
			setQuote("名言を取得できませんでした");
			setAuthor("");
		}
	};

	// 本日の日付を取得して設定
	useEffect(() => {
		const today = new Date();

		// 表示用日付
		const displayDate = today.toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		// datetime属性
		const isoDate = today.toISOString().split("T")[0];

		setCurrentDate(displayDate);
		setDateTime(isoDate);

		// 初回に明言を取得
		fetchQuote();
	}, []);

	// コピー処理
	const handleCopy = () => {
		const textToCopy = `${author}\n${quote}`;
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				alert("名言をコピーしました");
			})
			.catch ((error) => {
				console.error("コピーに失敗しました：", error);
				alert("コピーに失敗しました");
			});
	};

	return (
		<div className="p-quote">
			<div className="p-quote__title-wrap">
				<h1 className="c-heading-01">本日の名言</h1>
				<time dateTime={dateTime}>{currentDate}</time>
			</div>
			<div className="p-quote__item">
				<p className="p-quote__author">{author}</p>
				<div className="p-quote__text-wrap">
					<p className="p-quote__text">{quote}</p>
				</div>
				<div className="c-button-wrap">
					<button onClick={fetchQuote} className="c-button-01 c-button--blue">別の名言を見る</button>
					<button onClick={handleCopy} className="c-button-01 c-button--copy">名言をコピーする</button>
				</div>
			</div>
		</div>
	);
};

export default App;
