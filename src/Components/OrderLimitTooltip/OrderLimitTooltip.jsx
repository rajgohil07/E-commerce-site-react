import "./OrderLimitTooltip.css";
import { BootstrapTooltip } from "../BootstrapTooltip/BootstrapTooltip";
import { BsInfoCircle } from "react-icons/bs";

export const OrderLimitTooltip = ({ title }) => {
  return (
    <BootstrapTooltip title={title} arrow placement="right">
      <div>
        <BsInfoCircle className="orderLimitTooltipQuestionMarkIcon" />
      </div>
    </BootstrapTooltip>
  );
};
