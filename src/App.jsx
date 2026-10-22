import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";
import About from "./pages/About";
import Quote from "./pages/Quote";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { OrderSuccess, QuoteSuccess } from "./pages/Success";

export default function App() {
  return <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/quote-success/:id" element={<QuoteSuccess />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Routes>
      <Route path="/" element={<WhatsAppButton />} />
      <Route path="/services" element={<WhatsAppButton />} />
      <Route path="/products" element={<WhatsAppButton />} />
      <Route path="/products/:id" element={<WhatsAppButton />} />
      <Route path="/about" element={<WhatsAppButton />} />
      <Route path="/quote" element={<WhatsAppButton />} />
      <Route path="/track" element={<WhatsAppButton />} />
    </Routes>
  </>;
}
