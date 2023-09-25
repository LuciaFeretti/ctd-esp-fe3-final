import React from "react";
import data from "./data.json";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ICard } from "types";

type Props = {
  handleBack: () => void;
  handleChangeOptions: (datos: any, value: string) => void;
  payment: ICard;
  handlePayment: (datos: ICard) => void;
};

const Details: React.FC<Props> = ({
  handleChangeOptions,
  handleBack,
  handlePayment,
  payment,
}: Props) => {
  const shema = yup
    .object({
      cvc: yup
        .string()
        .required("El CVC es obligario")
        .matches(/^[0-9]{3}$/, "El CVC debe tener 3 dígitos"),
      expDate: yup
        .string()
        .required("La fecha es obligaria")
        .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "La fecha de vencimiento debe tener este formato: MM/YY"),
      nameOnCard: yup
        .string()
        .required("El nombre es obligario"),
      number: yup
        .string()
        .required("El numero es obligatorio")
        .matches(/^[0-9]{16}$/, "El número de tu tarjeta debe tener 16 dígitos"),
    })
    .required();

  type FormData = yup.InferType<typeof shema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(shema),
  });

  const onSubmit = (data: FormData) => {
    handleChangeOptions(data, "payment");
    handlePayment(data);
  };

  return (
    <Box sx={{ width: "80vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {data.map((item, key) => (
            <Controller
              key={key}
              name={item.name as keyof FormData}
              control={control}
              defaultValue={payment[item.name as keyof FormData] || ""}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label={item.label}
                  error={!!errors[item.name as keyof boolean] || false}
                  helperText={
                    errors[item.name as keyof FormData]?.message || ""
                  }
                  type={item.name === "cvc" ? "password" : "text"}
                  {...field}
                />
              )}
            />
          ))}
        </Stack>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit">Pagar</Button>
        </Box>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default Details;
