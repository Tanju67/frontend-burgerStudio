import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useDashboard from "../../shared/hooks/useDahboard";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../shared/services/productApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  updateProductSchema,
} from "../../shared/schemas/productSchemas";
import { toaster } from "../../shared/utils/toaster";

function AddProductForm() {
  const { data: user } = useGetCurrentUserQuery();
  const {
    dashboard: { editingProduct },
    closeProductModal,
  } = useDashboard();
  const { id } = useParams();

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isTestAdmin = user?.role === "test-admin";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      editingProduct ? updateProductSchema : addProductSchema,
    ),
    values: {
      title: editingProduct?.title || "",
      image: undefined,
      description: editingProduct?.description || "",
      price: editingProduct?.price || 0,
    },
  });

  useEffect(() => {
    if (editingProduct) {
      reset({
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
      });
    }
  }, [editingProduct, reset]);

  const onSubmit = async (data: any) => {
    if (isTestAdmin) {
      return toaster("warning", "Test admin cannot modify data.");
    }

    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("description", data.description);
      fd.append("price", data.price);
      if (data.image?.[0]) {
        fd.append("image", data.image[0]);
      }

      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, data: fd }).unwrap();
        toaster("success", "Product updated successfully");
      } else {
        await createProduct({ menuId: id!, data: fd }).unwrap();
        toaster("success", "Menu created successfully");
      }

      closeProductModal();
      reset();
    } catch (error) {
      console.error(error);
      toaster("error", "An unexpected error occurred");
    }
  };

  return (
    <div className="bg-main-light rounded-xl p-6 shadow-lg">
      <h2 className="text-main-btn mb-6 text-center text-2xl font-bold uppercase">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <input
            {...register("title")}
            type="text"
            placeholder="Product Title"
            className={`input bg-main w-full rounded border-2 p-2 outline-0 ${errors.title ? "border-red-500" : "focus:border-main-btn border-transparent"}`}
          />
          {errors.title && (
            <span className="ml-1 text-xs text-red-500">
              {errors.title.message as string}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <input
            {...register("price")}
            type="number"
            step="0.01"
            placeholder="Price"
            className={`input bg-main w-full rounded border-2 p-2 outline-0 ${errors.price ? "border-red-500" : "focus:border-main-btn border-transparent"}`}
          />
          {errors.price && (
            <span className="ml-1 text-xs text-red-500">
              {errors.price.message as string}
            </span>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1">
          <input
            {...register("image")}
            type="file"
            accept=".jpg,.png,.jpeg"
            className="input bg-main w-full rounded border-2 border-transparent p-1"
          />
          {errors.image && (
            <span className="ml-1 text-xs text-red-500">
              {errors.image.message as string}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Description"
            className={`textarea bg-main w-full resize-none rounded p-2 outline-0 ${errors.description ? "border-red-500" : "focus:border-main-btn border-transparent"}`}
          />
          {errors.description && (
            <span className="ml-1 text-xs text-red-500">
              {errors.description.message as string}
            </span>
          )}
        </div>

        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || isUpdating}
            className="bg-main-btn hover:bg-main-btn-hover min-w-35 px-6 py-2 text-white transition-all"
          >
            {isLoading || isUpdating ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner /> <span>Processing...</span>
              </div>
            ) : editingProduct ? (
              "Update Product"
            ) : (
              "Save Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
