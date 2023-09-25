import React from "react";
import data from "./data.json";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import { ICustomer } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

type Props = {
  handleNext: () => void;
  handleChangeOptions: (datos: any, value: string) => void;
  customer: ICustomer;
};

interface ICustomerPersonal {
  nombre: string;
  apellido: string;
  email: string;
}

const Personal: React.FC<Props> = ({
  handleNext,
  customer,
  handleChangeOptions,
}: Props) => {
  const shema = yup
    .object({
      nombre: yup
        .string()
        .required("El nombre es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        ,
      apellido: yup
        .string()
        .required("El apellido es obligario")
        .min(3, "El apellido debe tener al menos 3 caracteres"),
      email: yup
        .string()
        .email("No es un email válido")
        .required("El email es obligario")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ingresa un email válido"),
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
    handleChangeOptions(data, "customer");
    handleNext();
  };

  return (
    <Box sx={{ width: "80vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {data.map((item, key) => (
            <Controller
              key={key}
              name={item.name as keyof FormData}
              defaultValue={customer[item.name as keyof ICustomer] || ""}
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label={item.label}
                  error={!!errors[item.name as keyof boolean] || false}
                  helperText={
                    errors[item.name as keyof ICustomerPersonal]?.message || ""
                  }
                  {...field}
                />
              )}
            />
          ))}
        </Stack>
        
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit">Siguiente</Button>
        </Box>
      </form>

      <DevTool control={control} />
    </Box>
  );
};

export default Personal;
