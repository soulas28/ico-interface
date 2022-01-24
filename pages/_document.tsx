import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Scheherazade&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
