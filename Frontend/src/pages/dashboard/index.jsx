import { Box, useMediaQuery } from "@mui/material";
import DashRowOne from "./DashRowOne";
import DashRowTwo from "./DashRowTwo";
import DashRowThree from "./DashRowThree";
import React from "react";
import Navbar from '../navbar'
import styled from "styled-components";

// Add ErrorBoundary component here
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred while rendering this component.</div>;
    }

    return this.props.children;
  }
}

const gridTemplateAreasForLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateAreasForSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateAreasForLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "auto",
              gridTemplateAreas: gridTemplateAreasForSmallScreens,
            }
      }
    >  
      <DashRowOne />
      <ErrorBoundary>
        <DashRowThree />
      </ErrorBoundary>
      <DashRowTwo />
    </Box>
  );
};

export default Dashboard;