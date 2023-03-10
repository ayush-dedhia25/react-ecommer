import { Add, FavoriteBorderOutlined, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Item from '../../components/Item';
import { addToCart } from '../../state';
import { shades } from '../../theme';

function ItemDetails() {
	const dispatch = useDispatch();
	const { itemId } = useParams();
	const [value, setValue] = useState('description');
	const [count, setCount] = useState(1);
	const [item, setItem] = useState(null);
	const [items, setItems] = useState([]);

	const handleChange = (e, newValue) => setValue(newValue);

	const getItem = async () => {
		const response = await fetch(`http://localhost:1337/api/items/${itemId}?populate=image`);
		const item = await response.json();
		setItem(item.data);
	};

	const getItems = async () => {
		const response = await fetch(`http://localhost:1337/api/items?populate=image`);
		const items = await response.json();
		setItems(items.data);
	};

	useEffect(() => {
		getItem();
		getItems();
	}, [itemId]);

	return (
		<Box width="80%" m="80px auto">
			<Box display="flex" flexWrap="wrap" columnGap="40px">
				{/* Images */}
				<Box mb="40px" flex="1 1 40%">
					<img
						src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`}
						alt={item?.name}
						width="100%"
						height="100%"
						style={{ objectFit: 'contain' }}
					/>
				</Box>

				{/* Actions */}
				<Box mb="40px" flex="1 1 50%">
					<Box display="flex" justifyContent="space-between">
						<Box>Home/Item</Box>
						<Box>Prev Next</Box>
					</Box>

					<Box m="65px 0 25px 0">
						<Typography variant="h3">{item?.attributes?.name}</Typography>
						<Typography>₹ {item?.attributes?.price}</Typography>
						<Typography sx={{ mt: '20px' }}>{item?.attributes?.longDescription}</Typography>
					</Box>

					{/* Count and Button */}
					<Box minHeight="50px" display="flex" alignItems="center">
						<Box
							display="flex"
							alignItems="center"
							mr="20px"
							p="2px 5px"
							border={`1.5px solid ${shades.neutral[500]}`}
						>
							<IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
								<Remove />
							</IconButton>
							<Typography sx={{ p: '0 5px' }} color={shades.primary[300]}>
								{count}
							</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<Add />
							</IconButton>
						</Box>
						<Button
							sx={{
								minWidth: '150px',
								p: '10px 40px',
								color: 'white',
								bgcolor: '#222222',
								borderRadius: 0,
							}}
							onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
						>
							Add To Cart
						</Button>
					</Box>
					<Box>
						<Box m="20px 0 5px 0" display="flex">
							<FavoriteBorderOutlined />
							<Typography sx={{ ml: '5px' }}>Add To Wishlist</Typography>
						</Box>
						<Typography>Categories: {item?.attributes?.category}</Typography>
					</Box>
				</Box>
			</Box>

			{/* Information */}
			<Box m="20px 0">
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Description" value="description" />
					<Tab label="Reviews" value="reviews" />
				</Tabs>
			</Box>
			<Box display="flex" flexWrap="wrap" gap="15px">
				{value === 'description' && <div>{item?.attributes?.longDescription}</div>}
				{value === 'reviews' && <div>Reviews</div>}
			</Box>

			{/* Related Items */}
			<Box width="100%" mt="50px">
				<Typography variant="h3" fontWeight="bold">
					Related Products
				</Typography>
				<Box
					mt="20px"
					display="flex"
					flexWrap="wrap"
					columnGap="1.33%"
					justifyContent="space-between"
				>
					{items.slice(0, 4).map((item, i) => (
						<Item key={`${item.name}-${i}`} item={item} />
					))}
				</Box>
			</Box>
		</Box>
	);
}

export default ItemDetails;
