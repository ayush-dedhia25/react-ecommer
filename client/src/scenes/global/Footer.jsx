import { Box, Typography, useTheme } from '@mui/material';
import { shades } from '../../theme';

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt="70px" p="40px 0" bgcolor={neutral.light}>
      <Box
        width="80%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography variant="h4" fontWeight="bold" mb="30px" color={shades.secondary[500]}>
            Ecommer
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, nostrum minus
            laudantium aspernatur hic corporis sapiente praesentium id. In, perferendis?
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Funds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">GEB Colony, Porbandar, Gujarat - 360575, India</Typography>
          <Typography mb="30px">Email: ayushdedhi25@gmail.com</Typography>
          <Typography mb="30px">+91 2862253100</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
