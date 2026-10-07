import React from 'react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Cars from '@/pages/Cars';
import CarDetail from '@/pages/CarDetail';
import Fleet from '@/pages/Fleet';
import Services from '@/pages/Services';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Urbania from '@/pages/Urbania';
import { MobileBookingBar } from '@/components/booking/MobileBookingBar';
import { Cancellation, Privacy, Terms } from '@/pages/Legal';

function ScrollToTop() {
  const [location] = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);

  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <MobileBookingBar />
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/cars" component={Cars} />
          <Route path="/cars/:id" component={CarDetail} />
          <Route path="/fleet" component={Fleet} />
          <Route path="/services" component={Services} />
          <Route path="/urbania" component={Urbania} />
          <Route path="/packages" component={Packages} />
          <Route path="/packages/:slug" component={PackageDetail} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms-and-conditions" component={Terms} />
          <Route path="/cancellation-and-refund" component={Cancellation} />
          <Route path="/privacy-policy" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

export default App;
