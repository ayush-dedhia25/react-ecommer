import { MarkEmailReadOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import { useState } from 'react';

function Subscribe() {
	const [email, setEmail] = useState('');

	return (
		<Box width="80%" m="80px auto" textAlign="center">
			<IconButton>
				<MarkEmailReadOutlined fontSize="large" />
			</IconButton>
			<Typography variant="h3">Subscribe To Our Newsletter</Typography>
			<Typography>and receive ₹20 coupon for your first order on your checkout.</Typography>
			<Box
				width="75%"
				m="15px auto"
				p="2px 4px"
				display="flex"
				alignItems="center"
				bgcolor="#f2f2f2"
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<Typography sx={{ 'p': '10px', ':hover': { cursor: 'pointer' } }}>Subscribe</Typography>
			</Box>
		</Box>
	);
}

export default Subscribe;
