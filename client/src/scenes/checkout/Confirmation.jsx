import { Alert, AlertTitle, Box } from '@mui/material';
import { useEffect } from 'react';
import runFireworks from './confetti';

function Confirmation() {
	useEffect(() => {
		runFireworks();
	}, []);

	return (
		<Box width="80%" height="50vh" m="90px auto">
			<Alert severity="success">
				<AlertTitle>Success</AlertTitle>
				You have successfully made an order - <strong>Congrats on making your purchase</strong>
			</Alert>
		</Box>
	);
}

export default Confirmation;
