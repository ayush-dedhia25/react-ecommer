import { Box, TextField, Typography } from '@mui/material';

function Payment({ values, errors, touched, handleBlur, handleChange }) {
	return (
		<Box m="30px 0">
			{/* Contact Info */}
			<Box>
				<Typography fontSize="18px" sx={{ mb: '15px' }}>
					Contact Info
				</Typography>
				<TextField
					type="text"
					label="Email"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.email}
					name="email"
					error={!!touched.email && !!errors.email}
					helperText={touched.email && errors.email}
					sx={{ gridColumn: 'span 4', mb: '15px' }}
					fullWidth
				/>
				<TextField
					type="text"
					label="Phone Number"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.phoneNumber}
					name="phoneNumber"
					error={!!touched.phoneNumber && !!errors.phoneNumber}
					helperText={touched.phoneNumber && errors.phoneNumber}
					sx={{ gridColumn: 'span 4', mb: '15px' }}
					fullWidth
				/>
			</Box>
		</Box>
	);
}

export default Payment;
