import { Box, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../../components/Item';
import { setItems } from '../../state';

function ShoppingList() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const getItems = async () => {
    const items = await fetch('http://localhost:1337/api/items?populate=image');
    const itemsData = await items.json();
    dispatch(setItems(itemsData.data));
  };

  const topRatedItems = items.filter((item) => item.attributes.category === 'topRated');
  const newArrivalsItems = items.filter((item) => item.attributes.category === 'newArrivals');
  const bestSellersItems = items.filter((item) => item.attributes.category === 'bestSellers');

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>

      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          'm': '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>

      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === 'all' &&
          items.map((item) => <Item key={`${item.name}-${item.id}`} item={item} />)}
        {value === 'newArrivals' &&
          newArrivalsItems.map((item) => <Item key={`${item.name}-${item.id}`} item={item} />)}
        {value === 'topRated' &&
          topRatedItems.map((item) => <Item key={`${item.name}-${item.id}`} item={item} />)}
        {value === 'bestSellers' &&
          bestSellersItems.map((item) => <Item key={`${item.name}-${item.id}`} item={item} />)}
      </Box>
    </Box>
  );
}

export default ShoppingList;
