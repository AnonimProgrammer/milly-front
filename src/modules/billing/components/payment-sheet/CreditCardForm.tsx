type CreditCardFormProps = {
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvcChange: (value: string) => void;
};

const inputClassName =
  "w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-black transition-all outline-none focus:border-black focus:ring-1 focus:ring-black";

export function CreditCardForm({
  cardNumber,
  cardExpiry,
  cardCvc,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
}: CreditCardFormProps) {
  function handleCardNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
    onCardNumberChange(formattedValue);
  }

  function handleExpiryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue =
      value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
    onCardExpiryChange(formattedValue.slice(0, 5));
  }

  function handleCvcChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");
    onCardCvcChange(value.slice(0, 3));
  }

  return (
    <div className="space-y-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-all duration-300">
      <div>
        <label className="mb-1 block text-xs font-medium text-neutral-500">Card Number</label>
        <input
          type="text"
          maxLength={19}
          placeholder="•••• •••• •••• ••••"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className={inputClassName}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">Expiry Date</label>
          <input
            type="text"
            maxLength={5}
            placeholder="MM/YY"
            value={cardExpiry}
            onChange={handleExpiryChange}
            className={inputClassName}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">CVC</label>
          <input
            type="text"
            maxLength={3}
            placeholder="•••"
            value={cardCvc}
            onChange={handleCvcChange}
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  );
}
