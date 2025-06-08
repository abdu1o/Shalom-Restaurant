import React from 'react';

export const VerificationUserTemplate = ({
  code,
}: {
  code: string;
}) => (
  <div>
    <h1>Verification Code</h1>
    <p>
      Your code is: <strong>{code}</strong>
    </p>
    <p>
      Confirm registration here:{' '}
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Verify account
      </a>
    </p>
  </div>
);
