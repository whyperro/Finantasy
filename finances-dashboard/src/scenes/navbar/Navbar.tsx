import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import ScoreIcon from "@mui/icons-material/Score";

type Props = {};

const Navbar = () => {
  const { palette } = useTheme();
  const [active, setActive] = useState<string>("dashboard");
  return (
    <FlexBetween mb="0.5rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LADO IZQUIERDO */}
      <FlexBetween gap="0.75rem">
        <ScoreIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finantasy
        </Typography>
      </FlexBetween>
      {/* LADO DERECHO */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setActive("dashboard")}
            style={{
              color: active === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setActive("predictions")}
            style={{
              color: active === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predicciones
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
