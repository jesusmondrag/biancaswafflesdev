import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { WaffleBase, Ingredient, WaffleConfiguration, AppSettings, ExtraProduct, PaymentMethod } from './components/types';
import { DEFAULT_WAFFLE_BASES, DEFAULT_INGREDIENTS, DEFAULT_TOPPINGS, DEFAULT_SETTINGS, DEFAULT_EXTRA_PRODUCTS, DEFAULT_PAYMENT_METHODS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import WaffleBuilder from './components/WaffleBuilder';
import Checkout from './components/Checkout';
import OrderSidebar from './components/OrderSidebar';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import ExtraProductsSelector from './components/ExtraProductsSelector';
import Login from './components/admin/Login';
import FloatingOrderButton from './components/FloatingOrderButton';
import OrderSummaryModal from './components/OrderSummaryModal';

const calculateWafflePrice = (waffle: WaffleConfiguration | Omit<WaffleConfiguration, 'id'>) => {
    if (!waffle.base) return 0;
    const basePrice = waffle.base.price;
    const ingredientsPrice = waffle.ingredients.reduce((sum, item) => sum + item.price, 0);
    const toppingsPrice = waffle.toppings.reduce((sum, item) => sum + item.price, 0);
    return basePrice + ingredientsPrice + toppingsPrice;
};


function App() {
  const [waffleBases, setWaffleBases] = useLocalStorage<WaffleBase[]>('bases', DEFAULT_WAFFLE_BASES);
  const [ingredients, setIngredients] = useLocalStorage<Ingredient[]>('ingredients', DEFAULT_INGREDIENTS);
  const [toppings, setToppings] = useLocalStorage<Ingredient[]>('toppings', DEFAULT_TOPPINGS);
  const [extraProducts, setExtraProducts] = useLocalStorage<ExtraProduct[]>('extras', DEFAULT_EXTRA_PRODUCTS);
  const [paymentMethods, setPaymentMethods] = useLocalStorage<PaymentMethod[]>('payments', DEFAULT_PAYMENT_METHODS);
  const [settings, setSettings] = useLocalStorage<AppSettings>('settings', DEFAULT_SETTINGS);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('biancas-waffle-auth', false);
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial de datos desde data.json
  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (localStorage.getItem('bases') === JSON.stringify(DEFAULT_WAFFLE_BASES)) {
           setWaffleBases(data.bases || DEFAULT_WAFFLE_BASES);
           setIngredients(data.ingredients || DEFAULT_INGREDIENTS);
           setToppings(data.toppings || DEFAULT_TOPPINGS);
           setExtraProducts(data.extraProducts || DEFAULT_EXTRA_PRODUCTS);
           setPaymentMethods(data.paymentMethods || DEFAULT_PAYMENT_METHODS);
           setSettings(data.settings || DEFAULT_SETTINGS);
        }
      })
      .catch(error => {
        console.error("No se pudo cargar 'data.json'. Usando datos por defecto.", error);
      })
      .finally(() => {
        setIsLoading(false);
        const loader = document.getElementById('initial-loader');
        if (loader) {
            loader.classList.add('hidden');
        }
      });
  }, []);


  const createNewWaffle = useCallback((): Omit<WaffleConfiguration, 'id'> => ({
    base: waffleBases[1] || waffleBases[0], // Default to 2nd or 1st base
    ingredients: [],
    toppings: [],
  }), [waffleBases]);

  const [currentWaffle, setCurrentWaffle] = useState(createNewWaffle());
  const [order, setOrder] = useState<WaffleConfiguration[]>([]);
  const [extraProductsOrder, setExtraProductsOrder] = useState<(ExtraProduct & { quantity: number })[]>([]);
  const [nextId, setNextId] = useState(1);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('menu');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  const handleNavigate = (view: string) => {
    if (['menu', 'quienes-somos', 'contacto', 'admin'].includes(view)) {
      setCurrentView(view);
      window.location.hash = view;
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'menu';
      if (['menu', 'quienes-somos', 'contacto', 'admin'].includes(hash)) {
        setCurrentView(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentView('menu');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);
  
  useEffect(() => {
    if (waffleBases.length > 0 && !isLoading) {
      setCurrentWaffle(createNewWaffle());
    }
  }, [waffleBases, createNewWaffle, isLoading]);


  const handleBaseSelect = useCallback((base: WaffleBase) => {
    setCurrentWaffle(prev => ({ ...prev, base }));
  }, []);

  const handleIngredientToggle = useCallback((ingredient: Ingredient) => {
    setCurrentWaffle(prev => {
      const isSelected = prev.ingredients.find(item => item.id === ingredient.id);
      return {
        ...prev,
        ingredients: isSelected
          ? prev.ingredients.filter(item => item.id !== ingredient.id)
          : [...prev.ingredients, ingredient]
      };
    });
  }, []);
  
  const handleToppingToggle = useCallback((topping: Ingredient) => {
    setCurrentWaffle(prev => {
      const isSelected = prev.toppings.find(item => item.id === topping.id);
      return {
        ...prev,
        toppings: isSelected
          ? prev.toppings.filter(item => item.id !== topping.id)
          : [...prev.toppings, topping]
      };
    });
  }, []);

  const handleAddWaffleToOrder = useCallback(() => {
    setOrder(prevOrder => [...prevOrder, { ...currentWaffle, id: nextId }]);
    setNextId(prevId => prevId + 1);
    setCurrentWaffle(createNewWaffle());
  }, [currentWaffle, nextId, createNewWaffle]);

  const handleRemoveWaffleFromOrder = useCallback((idToRemove: number) => {
    setOrder(prevOrder => prevOrder.filter(waffle => waffle.id !== idToRemove));
  }, []);
  
  const handleAddExtraProduct = useCallback((product: ExtraProduct) => {
    setExtraProductsOrder(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const handleRemoveExtraProduct = useCallback((product: ExtraProduct) => {
    setExtraProductsOrder(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing && existing.quantity > 1) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
        }
        return prev.filter(item => item.id !== product.id);
    });
  }, []);

  const handleDeleteExtraProductFromOrder = useCallback((productId: number) => {
      setExtraProductsOrder(prev => prev.filter(item => item.id !== productId));
  }, []);


  const total = useMemo(() => {
    const waffleTotal = order.reduce((sum, waffle) => sum + calculateWafflePrice(waffle), 0);
    const extrasTotal = extraProductsOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return waffleTotal + extrasTotal;
  }, [order, extraProductsOrder]);
  
  const orderCount = useMemo(() => order.length + extraProductsOrder.reduce((sum, item) => sum + item.quantity, 0), [order, extraProductsOrder]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    handleNavigate('menu');
  };
  
  if (isLoading) {
    return null; // The initial loader in index.html is handling the visuals
  }

  if (currentView === 'admin') {
    if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
    return (
        <AdminPanel
            bases={waffleBases} setBases={setWaffleBases}
            ingredients={ingredients} setIngredients={setIngredients}
            toppings={toppings} setToppings={setToppings}
            extraProducts={extraProducts} setExtraProducts={setExtraProducts}
            paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods}
            settings={settings} setSettings={setSettings}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
        />
    );
  }

  return (
    <div className="bg-brand-pink min-h-screen font-sans text-gray-800 flex flex-col">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      <main className="flex-grow">
        {currentView === 'quienes-somos' && <AboutUs content={settings.aboutUsContent} />}
        {currentView === 'contacto' && <Contact settings={settings} faq={settings.faq} />}
        
        {currentView === 'menu' && (
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              
              <div id="menu" className="w-full lg:w-2/3">
                <Header />
                <WaffleBuilder
                  bases={waffleBases}
                  ingredients={ingredients}
                  toppings={toppings}
                  orderSize={order.length}
                  currentWaffle={currentWaffle}
                  onBaseSelect={handleBaseSelect}
                  onIngredientToggle={handleIngredientToggle}
                  onToppingToggle={handleToppingToggle}
                  onAddWaffleToOrder={handleAddWaffleToOrder}
                  calculateWafflePrice={calculateWafflePrice}
                />
                <ExtraProductsSelector
                    products={extraProducts}
                    order={extraProductsOrder}
                    onAdd={handleAddExtraProduct}
                    onRemove={handleRemoveExtraProduct}
                />
                <Checkout 
                  name={customerName}
                  phone={customerPhone}
                  onNameChange={(e) => setCustomerName(e.target.value)}
                  onPhoneChange={(e) => setCustomerPhone(e.target.value)}
                  address={customerAddress}
                  onAddressChange={(e) => setCustomerAddress(e.target.value)}
                  deliveryMethod={deliveryMethod}
                  onDeliveryMethodChange={setDeliveryMethod}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  paymentMethods={paymentMethods}
                  order={order}
                  extraProductsOrder={extraProductsOrder}
                  total={total}
                  settings={settings}
                />
              </div>

              <aside className="w-full lg:w-1/3 mt-12 lg:mt-0">
                 <OrderSidebar
                    order={order}
                    extraProductsOrder={extraProductsOrder}
                    total={total}
                    onRemoveWaffle={handleRemoveWaffleFromOrder}
                    onRemoveExtraProduct={handleDeleteExtraProductFromOrder}
                    calculateWafflePrice={calculateWafflePrice}
                 />
              </aside>
            </div>
          </div>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
      
      {currentView === 'menu' && (
        <>
            <FloatingOrderButton 
                orderCount={orderCount}
                onClick={() => setIsOrderSummaryOpen(true)}
            />
            <OrderSummaryModal
                isOpen={isOrderSummaryOpen}
                onClose={() => setIsOrderSummaryOpen(false)}
                order={order}
                extraProductsOrder={extraProductsOrder}
                total={total}
                onRemoveWaffle={handleRemoveWaffleFromOrder}
                onRemoveExtraProduct={handleDeleteExtraProductFromOrder}
                calculateWafflePrice={calculateWafflePrice}
            />
        </>
      )}

    </div>
  );
}

export default App;