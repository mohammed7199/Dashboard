import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Flex from "./Flex";

const BoxHeader = ({ icon, title, subtitle, sideText }) => {
  const { palette } = useTheme();
  return (
    <Flex color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <Flex>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h6">{subtitle}</Typography>
        </Box>
      </Flex>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </Flex>
  );
};

export default BoxHeader;