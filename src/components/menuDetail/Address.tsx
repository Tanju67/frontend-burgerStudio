import { useEffect, useMemo, useState } from "react";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import useCart from "../../shared/hooks/useCart";
import {
  useCreateOrderMutation,
  useGetMyAddressQuery,
  useUpdateAddressMutation,
} from "../../shared/services/orderApi";
import { formatAddress } from "../../shared/utils/helper";
import {
  addressSchema,
  type AddressFormData,
} from "../../shared/schemas/orderSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
      console.log(error);
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

  if (address?.street && !editAddress) {
    return (
      <div className="mt-4 flex h-full w-full flex-col justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <p className="flex flex-col">
            <span className="font-bold">Your Delivery Address:</span>
            <span>{formatAddress(address)}</span>
          </p>
          <p className="flex flex-col">
            <span className="font-bold">Your Phone Number:</span>
            <span>{address.phoneNumber}</span>
          </p>

          <Button
            onClick={() => setEditAddress(true)}
            type="button"
            className="bg-secondary-btn hover:bg-secondary-btn-hover self-start px-4 py-2"
          >
            Update Address
          </Button>
        </div>

        <div className="mb-10 flex items-center justify-between">
          <Button
            onClick={() => setActiveCart(0)}
            type="button"
            className="bg-secondary-btn hover:bg-secondary-btn-hover self-start px-4 py-2"
          >
            Back to Cart
          </Button>

          <Button
            onClick={handleCreateOrder}
            type="button"
            className="bg-main-btn hover:bg-main-btn-hover self-start px-4 py-2"
          >
            {isCreating ? <Spinner /> : "Order Now"}
          </Button>
        </div>
      </div>
    );
  }

  // ADRES YOKSA VEYA EDİT MODUNDAYSA (FORM)
  return (
    <div className="mt-4 w-full">
      <p className="mb-2 font-semibold">Please enter your delivery address</p>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="flex flex-col gap-1">
          <input
            {...register("street")}
            placeholder="Street"
            className={`input bg-main-light w-full outline-0 ${errors.street ? "border-red-500" : ""}`}
          />
          {errors.street && (
            <span className="text-xs text-red-500">
              {errors.street.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("houseNumber")}
            placeholder="House number"
            className="input bg-main-light w-full outline-0"
          />
          {errors.houseNumber && (
            <span className="text-xs text-red-500">
              {errors.houseNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("postalCode")}
            placeholder="Postal code"
            className="input bg-main-light w-full outline-0"
          />
          {errors.postalCode && (
            <span className="text-xs text-red-500">
              {errors.postalCode.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("city")}
            placeholder="City"
            className="input bg-main-light w-full outline-0"
          />
          {errors.city && (
            <span className="text-xs text-red-500">{errors.city.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="input bg-main-light w-full outline-0"
          />
          {errors.phoneNumber && (
            <span className="text-xs text-red-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button
            onClick={() =>
              address?.street ? setEditAddress(false) : setActiveCart(0)
            }
            type="button"
            className="bg-secondary-btn hover:bg-secondary-btn-hover self-start px-4 py-2"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-main-btn hover:bg-main-btn-hover self-start px-4 py-2"
          >
            {isCreating || isUpdating ? <Spinner /> : "Save & Order Now"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Address;
