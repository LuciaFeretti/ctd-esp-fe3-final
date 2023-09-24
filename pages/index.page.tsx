import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import CardComponent from "dh-marvel/components/card/card";
import type { GetServerSideProps, NextPage } from "next";
import { IComicResponse } from "types";
import { useRouter } from "next/router";
import { Grid, Pagination, Box } from "@mui/material";
import { useEffect, useState, ChangeEvent } from "react";
import { getComicsByPage, getComics } from "dh-marvel/services/marvel/marvel.service";

interface Props {
  cards: IComicResponse;
}

const Index: NextPage<Props> = ({ cards }) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IComicResponse>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (page !== null) {
      router.push(`/?page=${page}`, undefined, { shallow: true });
      getComicsByPage(12, page).then((data: IComicResponse) => {
        data.code === 200 ? setData(data) : null;
      });
    }
  }, [page]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pages: number =
    cards?.data?.total !== undefined ? Math.ceil(cards.data.total / 12) : 1;

  return (
    <>
      <Head>
        <title>DH MARVEL</title>
        <meta property="og:title" content="DH MARVEL"></meta>
        <meta name="description" content="Sumérgete en nuestra tienda virtual de cómics y explora una extensa colección de cómics tanto recientes como icónicos. Descubre a tus personajes heroicos preferidos, relatos emocionantes y ejemplares exclusivos. Adquiere cómics en línea de manera sencilla y déjate llevar por la aventura que te espera en cada página" />
        <meta name="keywords" content="tienda de comics, comics, comprar comics, heroes, marvel"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ margin: "20px" }}>
        <BodySingle title={"Comics"}></BodySingle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Pagination count={pages} page={page} onChange={handleChange} />
        </Box>
        <Grid container spacing={2}>
          {data !== undefined ?
            data.data.results.map((comic, key) => (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3} xl={3}>
                <CardComponent comic={comic} style={{ height: "400px" }}  />
              </Grid>
            ))
            : cards?.data.results.map((comic, key) => (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3} xl={3}>
                <CardComponent comic={comic} style={{ height: "400px" }}  />
              </Grid>
              ))
          }
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination count={pages} page={page} onChange={handleChange} />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const cards = await getComics(0, 12);
  return { props: { cards } };
};

export default Index;
