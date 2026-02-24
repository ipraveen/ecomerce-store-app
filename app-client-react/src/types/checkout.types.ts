export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardholderName: string;
  cardNumber: string;   // last 4 digits only after validation
  expiryMonth: string;
  expiryYear: string;
  // CVV: NEVER stored — use local ref in StepPayment.tsx
}

export interface CheckoutContextValue {
  step: CheckoutStep;
  shippingInfo: ShippingInfo | null;
  paymentInfo: PaymentInfo | null;
  orderId: string | null;
  goToStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  completeOrder: () => void;
  resetCheckout: () => void;
}
