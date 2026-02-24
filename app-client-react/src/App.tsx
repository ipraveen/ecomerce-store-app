import RegisterForm from '@/components/auth/Register';
import SignIn from '@/components/auth/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Store } from '@/pages/Store';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { useCart } from '@/context/CartContext';
import { CartProvider } from '@/context/CartContext';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { AuthProvider } from '@/auth/context/AuthProvider';
import RequiredAuthOutlet from '@/pages/outlets/RequiredAuthOutlet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartContextProvider } from '@/features/shopping-cart/context/CartContextProvider';
import { HomePage } from './pages/HomePage';
// import { useDatadogPageView } from '@/hooks/useDatadogPageView';
// import '@/telemetry/datadog';

// function RouteTracker() {
//     useDatadogPageView();
//     return null;
// }

// Create a client
const queryClient = new QueryClient();


function CheckoutProviderWithCart({ children }: { children: React.ReactNode }) {
  const { totalItems, totalPrice } = useCart();
  return (
    <CheckoutProvider totalItems={totalItems} totalPrice={totalPrice}>
      {children}
    </CheckoutProvider>
  );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CartProvider>
                    <CheckoutProviderWithCart>
                        <CartContextProvider>
                            <BrowserRouter>
                                {/* <RouteTracker /> */}
                                <Routes>
                                    <Route path="/login" element={<SignIn />} />
                                    <Route path="/register" element={<RegisterForm />} />

                                    <Route element={<RequiredAuthOutlet allowedRoles={['USER', 'ADMIN']} />}>
                                        <Route path="/" element={<HomePage />} />
                                    </Route>
                                    <Route element={<RequiredAuthOutlet allowedRoles={['ADMIN']} />}>
                                        <Route path="/admin" element={<Admin />} />
                                    </Route>

                                    {/* Catch-all route */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </BrowserRouter>
                        </CartContextProvider>
                    </CheckoutProviderWithCart>
                </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
