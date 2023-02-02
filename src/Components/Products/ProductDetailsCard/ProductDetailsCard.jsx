import { useNavigate } from "react-router-dom";
import "./ProductDetailsCard.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Zoom,
  Typography,
  Rating,
  Grid,
} from "@mui/material";
import { BootstrapTooltip } from "../../BootstrapTooltip/BootstrapTooltip";
import { publicURLPath } from "../../../Constants/PathConstants";

export const ProductDetailsCard = ({
  id,
  title,
  description,
  rating,
  price,
  thumbnail,
}) => {
  const navigate = useNavigate();

  return (
    <BootstrapTooltip
      onClick={() => {
        navigate(`${publicURLPath}/product/${id}`);
      }}
      title={`Click to buy ${title}`}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 500 }}
      placement="top"
      arrow
    >
      <Card>
        <CardActionArea>
          <CardMedia
            className="cardMediaImage"
            component="img"
            height="150"
            image={thumbnail}
            alt="Preview of product"
          />
          <CardContent>
            <Typography my={0} gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="priceTextSetter"
              m={0}
            >
              Price: <span>{price}$</span>
            </Typography>
            <Grid container alignItems={"center"}>
              <h1 className="rattingTextSetter">Ratings:</h1>
              <Rating
                name="read-only"
                precision={0.1}
                size="normal"
                value={rating}
                readOnly
              />
            </Grid>
            <Typography variant="body2" color="text.secondary">
              Description: {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </BootstrapTooltip>
  );
};
