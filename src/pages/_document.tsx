// import Document, { DocumentContext } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         })

//       const initialProps = await Document.getInitialProps(ctx)
//       return {
//         ...initialProps,
//         styles: [initialProps.styles, sheet.getStyleElement()],
//       }
//     } finally {
//       sheet.seal()
//     }
//   }
// }

// // export default function Document() {
// //   return (
// //     <Html lang="en">
// //       <Head />
// //       <body>
// //         <Main />
// //         <NextScript />
// //       </body>
// //     </Html>
// //   )
// // }

import { Html, Head, Main, NextScript } from 'next/document'

export default Document;

function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <body>
                <Main />
                <NextScript />

                {/* credits */}
                <div className="text-center mt-4">
                    <p>
                        <a href="https://jasonwatmore.com/next-js-13-mongodb-user-registration-and-login-tutorial-with-example-app" target="_top">Next.js 13 + MongoDB - User Registration and Login Tutorial with Example App</a>
                    </p>
                    <p>
                        <a href="https://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </body>
        </Html>
    );
}
