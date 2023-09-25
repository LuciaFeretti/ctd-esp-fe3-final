import NextLink from "next/link";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { IOrder } from "types";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface CustomerCheckout {
  nombre: string;
  apellido: string;
  email: string;
}

type checkoutType = {
  customer: CustomerCheckout;
  order: IOrder;
};

const ConfirmacionCompra: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<checkoutType>();

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setData(obj);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Box>
      <Box sx={{ backgroundColor: "green", width: "100%", textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h5" color="white" fontFamily={"Agdasima"}>
          ¡Que disfrutes tu compra! <ThumbUpIcon />
        </Typography>
      </Box>

      <Box >
        {data && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
            <Typography variant="h5">{data?.order.name}</Typography>
            <Box
              component="img"
              alt={data?.order.name}
              src={data?.order.image}
              sx={{
                boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                maxWidth: "500px",
                maxHeight: "500px",
                objectFit: "cover",
              }}
            /> 
            <Typography sx={{ textAlign: "center" }}>Precio: ${data?.order.price}</Typography> <hr />
            <Typography variant="h6" sx={{ textAlign: "center" }}>Datos personales</Typography>
            <Typography sx={{ textAlign: "center" }}>
              {data?.customer.nombre} {data?.customer.apellido} <br />
              {data?.customer.email}
            </Typography>             
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <NextLink href="/">
          <Button variant="contained" sx={{ margin: 5 }}>
            Volver al inicio
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default ConfirmacionCompra;