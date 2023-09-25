import * as React from "react";
import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import GeneralHeader from "dh-marvel/components/layouts/header/general-header.component";
import GeneralFooter from "dh-marvel/components/layouts/footer/general-footer.component";

const LayoutCheckout: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <>
      <Stack direction={"column"} height={"100%"}>
        <GeneralHeader variant={"simple"} />
        <Box display={"flex"} flexGrow={1} justifyContent={"center"}>
          {children}
        </Box>
        <GeneralFooter />
      </Stack>
    </>
  );
};
export default LayoutCheckout;
