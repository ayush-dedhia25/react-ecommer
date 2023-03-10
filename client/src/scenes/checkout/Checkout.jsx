import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { shades } from '../../theme';
import Payment from './Payment';
import Shipping from './Shipping';

const stripePromise = loadStripe(
	'pk_test_51LZqXLSF0e8FxhpzcQxY76LjmmgdLMyHvuMIyPYR397iQ2nuRL0ZQUtKLafzA3nWtzYNUPlxCxvGTxmKRjSzAUOu00w5CJiI5m'
);

const initialValues = {
	billingAddress: {
		firstName: '',
		lastName: '',
		country: '',
		street1: '',
		street2: '',
		city: '',
		state: '',
		zipCode: '',
	},
	shippingAddress: {
		isSameAddress: true,
		firstName: '',
		lastName: '',
		country: '',
		street1: '',
		street2: '',
		city: '',
		state: '',
		zipCode: '',
	},
	email: '',
	phoneNumber: '',
};

const checkoutSchema = [
	yup.object().shape({
		billingAddress: yup.object().shape({
			firstName: yup.string().required('Required'),
			lastName: yup.string().required('Required'),
			country: yup.string().required('Required'),
			street1: yup.string().required('Required'),
			street2: yup.string(),
			city: yup.string().required('Required'),
			state: yup.string().required('Required'),
			zipCode: yup.string().required('Required'),
		}),
		shippingAddress: yup.object().shape({
			isSameAddress: yup.boolean(),
			firstName: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			lastName: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			country: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			street1: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			street2: yup.string(),
			city: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			state: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
			zipCode: yup.string().when('isSameAddress', { is: false, then: yup.string().required('Required') }),
		}),
	}),
	yup.object().shape({
		email: yup.string().required('Email address required'),
		phoneNumber: yup.string().required('Phone number is required'),
	}),
];

function Checkout() {
	const [activeStep, setActiveStep] = useState(0);
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart.cart);
	const isFirstStep = activeStep === 0;
	const isSecondStep = activeStep === 1;

	useEffect(() => {
		if (!cart.length) navigate('/');
	}, []);

	const handleFormSubmit = async (values, actions) => {
		setActiveStep((currentStep) => currentStep + 1);
		// Copies the billing address onto shipping address
		if (isFirstStep && values.shippingAddress.isSameAddress) {
			actions.setFieldValue('shippingAddress', { ...values.billingAddress, isSameAddress: true });
		}
		if (isSecondStep) {
			makePayment(values);
		}
		actions.setTouched({});
	};

	const makePayment = async (values) => {
		console.log('🚀 ~ makePayment ~ values:', values);
		try {
			const stripe = await stripePromise;
			const requestBody = {
				userName: [values.shippingAddress.firstName, values.shippingAddress.lastName].join(' '),
				email: values.email,
				products: cart.map(({ id, count }) => ({ id, count })),
			};
			console.log('🚀 ~ makePayment ~ requestBody:', requestBody);
			const response = await fetch('http://localhost:1337/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(requestBody),
			});
			const session = await response.json();
			console.log('🚀 ~ makePayment ~ session:', session);
			await stripe.redirectToCheckout({ sessionId: session.id });
		} catch (err) {
			console.log('🚀 ~ makePayment ~ err:', err);
		}
	};

	return (
		<Box width="80%" m="100px auto">
			<Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
				<Step>
					<StepLabel>Billing</StepLabel>
				</Step>
				<Step>
					<StepLabel>Payment</StepLabel>
				</Step>
			</Stepper>

			<Box>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema[activeStep]}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
						<form onSubmit={handleSubmit}>
							{isFirstStep && (
								<Shipping
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							{isSecondStep && (
								<Payment
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							<Box display="flex" justifyContent="space-between" gap="50px">
								{!isFirstStep && (
									<Button
										color="primary"
										variant="contained"
										fullWidth
										sx={{
											color: 'white',
											padding: '15px 40px',
											bgcolor: shades.primary[200],
											borderRadius: 0,
											boxShadow: 'none',
										}}
										onClick={() => setActiveStep(activeStep - 1)}
									>
										Back
									</Button>
								)}
								<Button
									type="submit"
									color="primary"
									variant="contained"
									fullWidth
									sx={{
										color: 'white',
										padding: '15px 40px',
										bgcolor: shades.primary[400],
										borderRadius: 0,
										boxShadow: 'none',
									}}
								>
									{!isSecondStep ? 'Next' : 'Place Order'}
								</Button>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}

export default Checkout;
