import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&family=Nanum+Gothic:wght@400;700;800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css"
						integrity="sha512-o5v54Kh5PH0dgnf9ei0L+vMRsbm5fvIvnR/XkrZZjN4mqdaeH7PW66tumBoQVIaKNVrLCZiBEfHzRY4JJSMK/Q=="
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
					/>
					<script
						src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
						integrity="sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w=="
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
