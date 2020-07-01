import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H05pvEOmWioFerg7xVa3R8Mw4j6S14U80W3HfUa7lm9YYI90aFN3hpy28XHkhEU8yr1vVz7kf4ZLzazqnnIzdkG00boYQvy3K';
    const onToken = (token) => {
        console.log(token);
        alert('Payment successful');
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;