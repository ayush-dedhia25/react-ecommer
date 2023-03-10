import { Box, TextField, useMediaQuery } from '@mui/material';
import { getIn } from 'formik';

function AddressForm({ type, values, errors, touched, handleBlur, handleChange }) {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const formattedName = (f) => `${type}.${f}`;
	const formattedError = (f) => Boolean(getIn(touched, formattedName(f)) && getIn(errors, formattedName(f)));
	const formattedHelper = (f) => getIn(touched, formattedName(f)) && getIn(errors, formattedName(f));

	return (
		<Box
			display="grid"
			gap="15px"
			gridTemplateColumns="repeat(4, minmax(0, 1fr))"
			sx={{
				'& > div': {
					gridColumn: isNonMobile ? undefined : 'span 4',
				},
			}}
		>
			<TextField
				type="text"
				label="First Name"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.firstName}
				name={formattedName('firstName')}
				error={formattedError('firstName')}
				helperText={formattedHelper('firstName')}
				sx={{ gridColumn: 'span 2' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="Last Name"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.lastName}
				name={formattedName('lastName')}
				error={formattedError('lastName')}
				helperText={formattedHelper('lastName')}
				sx={{ gridColumn: 'span 2' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="Country"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.country}
				name={formattedName('country')}
				error={formattedError('country')}
				helperText={formattedHelper('country')}
				sx={{ gridColumn: 'span 4' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="Street Address"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.street1}
				name={formattedName('street1')}
				error={formattedError('street1')}
				helperText={formattedHelper('street1')}
				sx={{ gridColumn: 'span 2' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="Street Address 2 (optional)"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.street2}
				name={formattedName('street2')}
				error={formattedError('street2')}
				helperText={formattedHelper('street2')}
				sx={{ gridColumn: 'span 2' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="City"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.city}
				name={formattedName('city')}
				error={formattedError('city')}
				helperText={formattedHelper('city')}
				sx={{ gridColumn: 'span 2' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="State"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.state}
				name={formattedName('state')}
				error={formattedError('state')}
				helperText={formattedHelper('state')}
				sx={{ gridColumn: '1fr' }}
				fullWidth
			/>
			<TextField
				type="text"
				label="Zip Code"
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.zipCode}
				name={formattedName('zipCode')}
				error={formattedError('zipCode')}
				helperText={formattedHelper('zipCode')}
				sx={{ gridColumn: '1fr' }}
				fullWidth
			/>
		</Box>
	);
}

export default AddressForm;