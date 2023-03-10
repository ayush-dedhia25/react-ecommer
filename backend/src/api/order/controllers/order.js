'use strict';

/**
 * order controller
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	async create(ctx) {
		const { products, userName, email } = ctx.request.body;
		try {
			// Retrieve item information
			const lineItems = await Promise.all(
				products.map(async (product) => {
					const item = await strapi.service('api::item.item').findOne(product.id);

					return {
						price_data: {
							currency: 'inr',
							product_data: {
								name: item.name,
							},
							unit_amount: item.price * 100,
						},
						quantity: product.count,
					};
				})
			);

			// Create stripe session
			const session = await stripe.checkout.sessions.create({
				line_items: lineItems,
				mode: 'payment',
				payment_method_types: ['card'],
				customer_email: email,
				success_url: 'http://localhost:5173/checkout/success',
				cancel_url: 'http://localhost:5173/',
			});

			// Create the item
			await strapi.service('api::order.order').create({
				data: { userName, products, stripeSessionId: session.id },
			});

			return { id: session.id };
		} catch (err) {
			ctx.response.status = 500;
			return { error: { message: 'There was a problem creating the charge' } };
		}
	},
}));
