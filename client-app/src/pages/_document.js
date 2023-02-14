import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head  >
				<link rel="icon" href="/favicon.ico" />
				{/* <link rel="stylesheet" href="boxicons.min.css" />
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" /> */}
				<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
			</Head>
			<body className="app">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
