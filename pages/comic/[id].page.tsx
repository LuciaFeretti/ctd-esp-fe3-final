import React from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IComic, IComicResponse } from "types";

interface Props {
  comic: IComic;
}

const TEXT = "No tiene descripción :(";

const Comic: NextPage<Props> = ({ comic }) => {
  function obtenerNumeroDeURL(url: string): string | null {
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : null;
  }

  return (
    <Box sx={{ margin: "20px 50px" }}>
      <Box
        sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h5">{comic?.title}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Box
          component="img"
          alt={comic?.title}
          src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
          sx={{
            boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
            width: "500px",
            height: "500px",
            objectFit: "cover",
          }}/>
        
        <Box sx={{ marginLeft: "50px" }}>
          <Typography sx={{ width: "500px", marginBottom: "10px" }}>
            <strong>Descripcion:</strong> <br />
            {comic?.description === "" || comic?.description === null
              ? TEXT
              : comic?.description}
          </Typography>

          <Typography>
            <strong>Precio anterior:</strong> $ {comic?.oldPrice}
          </Typography>

          <Typography>
            <strong>Precio actual: </strong> $
            {comic?.price}
          </Typography>

          <Box
            sx={{
              margin: "20px 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography>
              {" "}
              {comic?.stock === 0 ? "¡Lo sentimos! No hay stock disponible" : `Stock: ${comic?.stock}`}
            </Typography>
            <NextLink href={{ pathname: "/checkout/", query: `comic=${comic?.id}` }}>
              <Button
                disabled={comic?.stock === 0 ? true : false}
                variant="contained"
              >
                Comprar
              </Button>
            </NextLink>
            
          </Box>
          <Box>
          {comic?.characters?.items.length > 0 ? (
            <>
              <Typography sx={{ margin: "50px 0 -15px 0" }}>Personajes asociados a este comic:</Typography>
              <ul>
                {comic?.characters?.items.map((character, key) => (
                  <li key={key}>
                    <NextLink href={`/personajes/${obtenerNumeroDeURL(character?.resourceURI)}`}>
                      {character?.name}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </>
            ) : <Typography sx={{ margin: "50px 0 -15px 0" }}>¡Una lástima! Este comic no tiene personajes asociados</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comic = await getComic(parseInt(params?.id as string));
  return {
    props: {
      comic,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();
  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
};

export default Comic;
