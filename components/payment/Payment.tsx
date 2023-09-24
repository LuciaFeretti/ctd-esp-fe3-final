import React from "react";
import { IComic } from "types";
import { Box, Typography } from "@mui/material";

type Props = {
  comic: IComic | undefined;
};

const Payment = ({ comic }: Props) => {
  return (
    <Box sx={{ margin: "0 30px" }}>
      <Typography variant="h4">{comic?.title}</Typography>
      <Typography variant="h5">Precio: {comic?.price}</Typography>
      <Typography variant="h6">{comic?.description}</Typography>

      
      <Box
        component="img"
        alt={comic?.title}
        src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
        sx={{
          boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
          width: "300px",
          height: "300px",
          objectFit: "fill",
        }}
      />
    </Box>
  );
};

export default Payment;
