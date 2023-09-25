import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import NextLink from "next/link";
import { IComic } from "types";

interface Props {
  comic: IComic;
  style?: React.CSSProperties
}

const CardComponent: FC<Props> = ({ comic, style }) => {
  return (
    <Card style={style} sx={{ maxHeight: 550, display:"flex", flexDirection:"column", justifyContent: "space-between"}}>
      <Box>
        <CardMedia
          component="img"
          height="200"
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {comic.title}
          </Typography>
        </CardContent>
      </Box>
      
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "20px"
        }}
      >

        <NextLink href={`/comic/${comic.id}`} >
          <Button size="small" variant="outlined">
            Ver detalles
          </Button>
        </NextLink>

        <NextLink href={`/checkout?comic=${comic.id}`}>
          <Button size="small" variant="contained">
            COMPRAR
          </Button>
        </NextLink>

      </CardActions>
    </Card>
  );
};

export default CardComponent;
