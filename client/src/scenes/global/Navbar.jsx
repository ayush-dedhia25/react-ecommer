import {
  MenuOutlined,
  PersonOutline,
  SearchOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { Badge, Box, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../state';
import { shades } from '../../theme';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Box
      width="100%"
      height="60px"
      display="flex"
      alignItems="center"
      bgcolor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top={0}
      left={0}
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate('/')}
          sx={{
            '&:hover': { cursor: 'pointer' },
            'color': shades.secondary[500],
          }}
        >
          Ecommer
        </Box>
        <Box display="flex" justifyContent="space-between" columnGap={20} zIndex={2}>
          <IconButton sx={{ color: 'black' }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: 'black' }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': { minWidth: 13, height: 14, right: 5, top: 5, padding: '0 4px' },
            }}
          >
            <IconButton sx={{ color: 'black' }} onClick={() => dispatch(setIsCartOpen({}))}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: 'black' }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
