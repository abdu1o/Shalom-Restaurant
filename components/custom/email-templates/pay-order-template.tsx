import React from 'react';

export const PayOrderTemplate = ({
  orderId,
  totalAmount,
  paymentUrl,
}: {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}) => (
  <div>
    <h1>Order №{orderId}</h1>
    <p>
      Total amount: ${totalAmount}. <br />
      Proceed to payment: <a href={paymentUrl}>Click here</a>
    </p>
  </div>
);
