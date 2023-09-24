import React from "react";
import data from "./data.json";
import { Stack, TextField, Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { IAddress } from "types";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { isNullOrUndefined } from "util";

type Props = {
  handleNext: () => void;
  handleBack: () => void;
  handleChangeOptions: (datos: any, value: string) => void;
  address: IAddress;
};

const Address: React.FC<Props> = ({
  handleNext,
  handleBack,
  handleChangeOptions,
  address,
}: Props) => {
  const shema = yup.object({
    address1: yup
      .string()
      .required("La dirección es obligatoria")
      .min(3, "La dirección debe tener al menos 3 caracteres"),
    address2: yup
      .string()
      .required("La dirección es obligatoria")
      .min(3, "La dirección debe tener al menos 3 caracteres"),
    city: yup
      .string()
      .required("La ciudad es obligatoria")
      .min(3, "La ciudad debe tener al menos 3 caracteres"),
    state: yup
      .string()
      .required("La provincia es obligatoria")
      .min(3, "La provincia debe tener al menos 3 caracteres"),
    zipCode: yup
      .string()
      .required("El código postal es obligatorio")
      .min(3, "El código postal debe tener al menos 3 caracteres"),
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
    handleChangeOptions(data, "address");
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
              control={control}
              defaultValue={address[item.name as keyof IAddress] || ""}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label={item.label}
                  error={!!errors[item.name as keyof boolean] || false}
                  helperText={
                    errors[item.name as keyof IAddress]?.message || ""
                  }
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
          <Button type="submit">Siguiente</Button>
        </Box>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default Address;
