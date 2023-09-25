import HorizontalLinearStepper from "dh-marvel/components/stepper/Stepper";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IComic } from "types";
import Payment from "dh-marvel/components/payment/Payment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";

const steps = ["Datos Personales", "Datos de entrega", "Datos del pago"];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const router = useRouter();
  const { comic } = router.query;
  const [data, setData] = useState<IComic | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = comic?.toString() || "0";
        if (comic) {
          const response = await fetch(`/api/comics/${id}`);
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            const errorData = await response.json();
            if (errorData.error) {
              setError(errorData.message || "Error desconocido");
            } else {
              //throw new Error("Error al obtener los datos");
              const errorMessage = errorData.message || "Error desconocido";
              setError(errorMessage);
              console.log(errorMessage);
            }
            
          }
        } else {
          router.push("/");
        }
        } catch (error) {
          console.error(error);
          setError("Error al obtener los datos"); 
      }
    };
    
    fetchData();
  }, [comic, router]);

  const props = {
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
    steps,
    data,
  };

  return (
    <Box>
      <Box sx={{ margin: "30px 0 20px 0" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      <Box sx={{ display: "flex" }}>
        <HorizontalLinearStepper {...props} />
        <Payment comic={data} />
      </Box>

      <Box>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)} 
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

      </Box>
    </Box>
  );
};

export default Checkout;
