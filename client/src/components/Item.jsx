import { Add, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../state';
import { shades } from '../theme';

function Item({ item, width }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [isHovered, setIsHovered] = useState(false);
	const {
		palette: { neutral },
	} = useTheme();
	const { category, price, name, image } = item.attributes;
	const {
		data: {
			attributes: {
				formats: {
					thumbnail: { url },
				},
			},
		},
	} = image;

	return (
		<Box width={width}>
			<Box position="relative" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
				<img
					src={`http://localhost:1337${url}`}
					alt={item.name}
					width="300px"
					height="400px"
					onClick={() => navigate(`/item/${item.id}`)}
					style={{ cursor: 'pointer', objectFit: 'cover' }}
				/>
				<Box
					position="absolute"
					display={isHovered ? 'block' : 'none'}
					width="100%"
					bottom="10%"
					left="0"
					padding="0 5%"
				>
					<Box display="flex" justifyContent="space-between">
						<Box display="flex" alignItems="center" bgcolor={shades.neutral[100]} borderRadius="3px">
							<IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
								<Remove />
							</IconButton>
							<Typography color={shades.primary[300]}>{count}</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<Add />
							</IconButton>
						</Box>

						{/* Button */}
						<Button
							sx={{ bgcolor: shades.primary[300], color: 'white' }}
							onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
						>
							Add to Cart
						</Button>
					</Box>
				</Box>
			</Box>

			<Box mt="3px">
				<Typography variant="subtitle2" color={neutral.dark}>
					{category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
				</Typography>
				<Typography>{name}</Typography>
				<Typography fontWeight="bold" sx={{ mt: 2 }}>
					₹ {price}
				</Typography>
			</Box>
		</Box>
	);
}

export default Item;
