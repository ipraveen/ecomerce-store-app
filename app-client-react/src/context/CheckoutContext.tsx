import React, { createContext, useContext, useReducer } from 'react';
// import { faro } from '@/lib/faro';
import type { CheckoutContextValue, CheckoutStep, ShippingInfo, PaymentInfo } from '@/types';

// ─── State ───────────────────────────────────────────────────────────────────

interface CheckoutState {
  step: CheckoutStep;
  shippingInfo: ShippingInfo | null;
  paymentInfo: PaymentInfo | null;
  orderId: string | null;
}

const initialState: CheckoutState = {
  step: 'shipping',
  shippingInfo: null,
  paymentInfo: null,
  orderId: null,
};

const STEP_ORDER: CheckoutStep[] = ['shipping', 'payment', 'review', 'confirmation'];

// ─── Actions ─────────────────────────────────────────────────────────────────

type CheckoutAction =
  | { type: 'GO_TO_STEP'; step: CheckoutStep; prevStep: CheckoutStep }
  | { type: 'SET_SHIPPING'; info: ShippingInfo }
  | { type: 'SET_PAYMENT'; info: PaymentInfo }
  | { type: 'COMPLETE_ORDER'; orderId: string }
  | { type: 'RESET' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'GO_TO_STEP':
      return { ...state, step: action.step };
    case 'SET_SHIPPING':
      return { ...state, shippingInfo: action.info };
    case 'SET_PAYMENT':
      return { ...state, paymentInfo: action.info };
    case 'COMPLETE_ORDER':
      return { ...state, step: 'confirmation', orderId: action.orderId };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

interface CheckoutProviderProps {
  children: React.ReactNode;
  totalItems?: number;
  totalPrice?: number;
}

export function CheckoutProvider({
  children,
  totalItems = 0,
  totalPrice = 0,
}: CheckoutProviderProps) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  function goToStep(step: CheckoutStep) {
    const prevStep = state.step;
    dispatch({ type: 'GO_TO_STEP', step, prevStep });
    faro.api.pushEvent('checkout_step_entered', {
      step,
      prev_step: prevStep,
    });
  }

  function nextStep() {
    const currentIndex = STEP_ORDER.indexOf(state.step);
    if (currentIndex < STEP_ORDER.length - 1) {
      goToStep(STEP_ORDER[currentIndex + 1]);
    }
  }

  function setShippingInfo(info: ShippingInfo) {
    dispatch({ type: 'SET_SHIPPING', info });
  }

  function setPaymentInfo(info: PaymentInfo) {
    dispatch({ type: 'SET_PAYMENT', info });
  }

  function completeOrder() {
    const orderId = `ORD-${Date.now()}`;
    dispatch({ type: 'COMPLETE_ORDER', orderId });
    // faro.api.pushEvent('checkout_completed', {
    //   item_count: String(totalItems),
    //   total_price: String(totalPrice),
    // });
  }

  function resetCheckout() {
    dispatch({ type: 'RESET' });
  }

  const value: CheckoutContextValue = {
    step: state.step,
    shippingInfo: state.shippingInfo,
    paymentInfo: state.paymentInfo,
    orderId: state.orderId,
    goToStep,
    nextStep,
    setShippingInfo,
    setPaymentInfo,
    completeOrder,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
