import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

export const ProductsListLimit = ({ changeLimit, limit }) => {
  return (
    <Box sx={{ width: "100px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Page limit</InputLabel>
        <Select
          value={limit}
          label="Page limit"
          onChange={(e) => changeLimit(e.target.value)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
