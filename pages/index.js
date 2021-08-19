import Head from "next/head";
import Header from "../components/Header/Header";
import Nav from "../components/Navbar/Navbar";
import Results from '../components/Results/Results';

import requests from "../utils/request";

export default function Home({results}) {

  console.log(results);
  
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    }
  }
}
