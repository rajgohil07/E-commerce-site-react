import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";

export const BootstrapTooltip = (props) => {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "black",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "black",
      fontSize: "15px",
    },
  }));
  return (
    <div>
      <BootstrapTooltip {...props} />
    </div>
  );
};
