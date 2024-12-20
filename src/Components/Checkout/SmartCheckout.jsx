const SmartCheckout = () => {
  return (
    <div className="smart-checkout">
      <AddressAutocomplete />
      <MultiplePaymentMethods />
      <DeliveryTimeSelector />
      <GiftWrapping />
      <OrderSummaryWithTaxCalculator />
    </div>
  );
}; 