import "../styles/static.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => {
      let newDoc: any = document;
      newDoc.getElementById("holderStyle").remove();
    });
  }

  return (
    <>
      <Head>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
      *, *::before, *::after {
        transition: none!important;
      }
    `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
