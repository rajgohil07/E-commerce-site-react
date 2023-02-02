import "./OrderLimitTooltip.css";
import { BootstrapTooltip } from "../BootstrapTooltip/BootstrapTooltip";
import { BsInfoCircle } from "react-icons/bs";

export const OrderLimitTooltip = ({ title, placement }) => {
  return (
    <BootstrapTooltip title={title} arrow placement={placement}>
      <div>
        <BsInfoCircle className="orderLimitTooltipQuestionMarkIcon" />
      </div>
    </BootstrapTooltip>
  );
};
