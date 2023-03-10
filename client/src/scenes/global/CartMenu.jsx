import styled from '@emotion/styled';
import { Add, Close, Remove } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from '../../state';
import { shades } from '../../theme';

const FlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

function CartMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { cart, isCartOpen } = useSelector((state) => ({
		cart: state.cart.cart,
		isCartOpen: state.cart.isCartOpen,
	}));
	const totalPrice = cart.reduce((total, item) => total + item.count * item.attributes.price, 0);

	return (
		<Box
			sx={{
				position: 'fixed',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				display: isCartOpen ? 'block' : 'none',
				bgcolor: 'rgba(0, 0, 0, 0.4)',
				zIndex: 10,
				overflow: 'auto',
			}}
		>
			<Box
				sx={{
					position: 'fixed',
					right: 0,
					bottom: 0,
					width: 'max(400px, 30%)',
					height: '100%',
					bgcolor: 'white',
				}}
			>
				<Box height="100%" padding="30px" overflow="auto">
					{/* Header Section */}
					<FlexBox mb={15}>
						<Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
						<IconButton onClick={() => dispatch(setIsCartOpen({}))}>
							<Close />
						</IconButton>
					</FlexBox>

					{/* Cart List */}
					<Box>
						{cart.map((item) => (
							<Box key={`${item.attributes.name}-${item.id}`}>
								<FlexBox p="15px 0">
									<Box flex="1 1 40%">
										<img
											src={`http://localhost:1337${item.attributes?.image?.data?.attributes?.formats?.small?.url}`}
											alt={item?.name}
											width="123px"
											height="164px"
										/>
									</Box>

									<Box flex="1 1 60%">
										{/* Item Name */}
										<FlexBox mb="5px">
											<Typography fontWeight="bold">{item.attributes.name}</Typography>
											<IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
												<Close />
											</IconButton>
										</FlexBox>
										<Typography>{item.attributes.shortDescription}</Typography>

										{/* Amount */}
										<FlexBox m="15px 0">
											<Box display="flex" alignItems="center" border={`1.5px solid ${shades.neutral[500]}`}>
												<IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
													<Remove />
												</IconButton>
												<Typography>{item.count}</Typography>
												<IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
													<Add />
												</IconButton>
											</Box>

											{/* Price */}
											<Typography fontWeight="bold">₹ {item.attributes.price}</Typography>
										</FlexBox>
									</Box>
								</FlexBox>
								<Divider />
							</Box>
						))}
					</Box>

					{/* Actions */}
					<Box m="20px 0">
						<FlexBox m="20px 0">
							<Typography fontWeight="bold">SUBTOTAL</Typography>
							<Typography fontWeight="bold">₹ {totalPrice}</Typography>
						</FlexBox>
						<Button
							sx={{
								minWidth: '100%',
								m: '20px 0',
								padding: '20px 40px',
								color: 'white',
								bgcolor: shades.primary[400],
								borderRadius: 0,
							}}
							onClick={() => {
								navigate('/checkout');
								dispatch(setIsCartOpen({}));
							}}
						>
							CHECKOUT
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default CartMenu;
