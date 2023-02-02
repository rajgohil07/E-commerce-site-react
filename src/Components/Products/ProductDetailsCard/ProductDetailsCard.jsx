import "./ProductDetailsCard.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Zoom,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  Rating,
  Grid,
} from "@mui/material";

export const ProductDetailsCard = ({
  title,
  description,
  rating,
  price,
  thumbnail,
}) => {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "black",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "black",
      fontSize: "15px",
    },
  }));

  return (
    <BootstrapTooltip
      title={`Click to buy ${title}`}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: 500 }}
      placement="top"
      arrow
    >
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={thumbnail}
            alt="Galaxy S22 Ultra"
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
