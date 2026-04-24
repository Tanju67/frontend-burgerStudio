import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import useCart from "../../shared/hooks/useCart";
import {
  addressSchema,
  type AddressFormData,
} from "../../shared/schemas/orderSchemas";
import {
  useCreateOrderMutation,
  useGetMyAddressQuery,
  useUpdateAddressMutation,
} from "../../shared/services/orderApi";
import { formatAddress, giveAddressArr } from "../../shared/utils/helper";
import { toaster } from "../../shared/utils/toaster";

function Address() {
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const { data: address, isLoading: isAddressLoading } = useGetMyAddressQuery();
  const [editAddress, setEditAddress] = useState(false);
  const {
    cart: { cartData },
    clearCart,
    setActiveCart,
  } = useCart();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);

  const orderData = useMemo(() => {
    return cartData.map((item) => ({
      product: item._id,
      price: item.price,
      amount: item.amount,
    }));
  }, [cartData]);
  const onFormSubmit = async (formData: AddressFormData) => {
    try {
      await updateAddress({ data: formData }).unwrap();
      await createOrder(orderData).unwrap();

      toaster("success", "Order created");
      clearCart();
      setActiveCart(2);
    } catch (error) {
      console.error("Order Error:", error);
    }
  };
  const handleCreateOrder = async () => {
    try {
      await createOrder(orderData).unwrap();
      toaster("success", "Order created");
      clearCart();
      setActiveCart(2);
    } catch (error) {
      console.log(error);
    }
  };

  if (isAddressLoading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  }

  // DISPLAY MODE: If address exists and not in edit mode
  if (address?.street && !editAddress) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 mt-6 flex h-full flex-col duration-500">
        <div className="flex-1 space-y-6">
          {/* Visual Address Card */}
          <div className="bg-main-light/50 border-main/10 group relative overflow-hidden rounded-3xl border p-5">
            <div className="absolute top-0 right-0 p-3 opacity-10 transition-opacity group-hover:opacity-20">
              <span className="text-4xl">📍</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-main-btn text-[10px] font-black tracking-[0.2em] uppercase italic">
                  Delivery Address
                </span>
                <p className="text-text-dark mt-1 text-lg leading-tight font-bold">
                  {formatAddress(address)}
                </p>
              </div>

              <div>
                <span className="text-main-btn text-[10px] font-black tracking-[0.2em] uppercase italic">
                  Contact Phone
                </span>
                <p className="text-text-dark mt-1 text-lg font-bold">
                  {address.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEditAddress(true)}
            type="button"
            className="text-main-dark hover:text-main-btn px-1 text-sm font-bold underline underline-offset-4 transition-colors"
          >
            Change Delivery Details
          </button>
        </div>

        {/* Action Buttons */}
        <div className="border-main/10 mt-10 flex items-center justify-between gap-4 border-t pt-6">
          <button
            onClick={() => setActiveCart(0)}
            type="button"
            className="text-main-dark hover:text-secondary-btn text-sm font-bold tracking-widest uppercase transition-colors"
          >
            ← Back
          </button>

          <Button
            onClick={handleCreateOrder}
            type="button"
            disabled={isCreating}
            className="bg-main-btn hover:bg-main-btn-hover flex-1 rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-[0_10px_20px_rgba(110,2,111,0.2)] transition-all active:scale-95"
          >
            {isCreating ? (
              <Spinner />
            ) : (
              <p>
                <span className="hidden sm:inline">Confirm &</span> Order Now 🍔
              </p>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // EDIT MODE / NO ADDRESS (FORM)
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mt-6 w-full duration-500">
      <h3 className="text-main-btn mb-6 text-center text-sm font-black tracking-widest uppercase italic">
        Shipping Details
      </h3>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {giveAddressArr(errors).map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <input
              {...register(field.id as keyof AddressFormData)}
              placeholder={field.label}
              className={`bg-main-light/50 w-full rounded-2xl border px-5 py-3 text-sm font-medium transition-all outline-none ${
                field.error
                  ? "border-red-500/50 ring-1 ring-red-500/10 focus:border-red-500"
                  : "border-main/20 focus:border-main-btn focus:ring-main-btn/20 focus:ring-1"
              }`}
            />
            {field.error && (
              <span className="px-2 text-[10px] font-bold tracking-wider text-red-500 uppercase italic">
                {field.error.message}
              </span>
            )}
          </div>
        ))}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={() =>
              address?.street ? setEditAddress(false) : setActiveCart(0)
            }
            type="button"
            className="text-main-dark hover:text-secondary-btn text-sm font-bold tracking-widest uppercase transition-colors"
          >
            Cancel
          </button>

          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-main-btn hover:bg-main-btn-hover flex-1 rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
          >
            {isCreating || isUpdating ? <Spinner /> : "Save & Order Now"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Address;
