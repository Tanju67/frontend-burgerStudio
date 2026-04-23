import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDashboard from "../../shared/hooks/useDahboard";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../shared/services/productApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  updateProductSchema,
} from "../../shared/schemas/productSchemas";
import { toaster } from "../../shared/utils/toaster";
import { cn } from "../../shared/utils/cn";
import { FaCloudUploadAlt } from "react-icons/fa";

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
    control,
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

  // Watch for image changes to show file name
  const imageFile = useWatch({
    control,
    name: "image",
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
    if (isTestAdmin)
      return toaster("warning", "Test admin cannot modify data.");

    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("description", data.description);
      fd.append("price", data.price.toString());
      if (data.image?.[0]) fd.append("image", data.image[0]);

      if (editingProduct) {
        updateProduct({
          id: editingProduct._id,
          menuId: id!,
          data: fd,
        }).unwrap();
        toaster("success", "Product updated!");
      } else {
        await createProduct({ menuId: id!, data: fd }).unwrap();
        toaster("success", "Product added!");
      }
      closeProductModal();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyles = (hasError: any) =>
    cn(
      "w-full bg-white border-4 rounded-2xl px-4 py-3 font-bold text-main-btn transition-all outline-none",
      hasError
        ? "border-red-500"
        : "border-main focus:border-main-btn focus:shadow-[4px_4px_0px_0px_rgba(var(--main-btn-rgb),1)]",
    );

  return (
    <div className="bg-bg rounded-[2.5rem] p-2 sm:p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-main-btn text-2xl font-black tracking-tighter uppercase italic">
          {editingProduct ? "Edit Item" : "Create Item"}
        </h2>
        <div className="bg-main mx-auto mt-2 h-1.5 w-16 rounded-full" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-main-btn/40 ml-2 text-[10px] font-black tracking-widest uppercase">
            Product Name
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="e.g. Double Studio Burger"
            className={inputStyles(errors.title)}
          />
          {errors.title && (
            <span className="ml-2 text-[10px] font-bold text-red-500 uppercase">
              {errors.title.message as string}
            </span>
          )}
        </div>

        {/* Price & Image Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-main-btn/40 ml-2 text-[10px] font-black tracking-widest uppercase">
              Price ($)
            </label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className={inputStyles(errors.price)}
            />
            {errors.price && (
              <span className="ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.price.message as string}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-main-btn/40 ml-2 text-[10px] font-black tracking-widest uppercase">
              Photo
            </label>
            <label
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-4 border-dashed py-3 transition-all",
                imageFile?.[0]
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-main text-main-btn hover:bg-main/10",
              )}
            >
              <FaCloudUploadAlt size={20} />
              <span className="truncate px-2 text-xs font-black uppercase">
                {imageFile?.[0] ? imageFile[0].name : "Upload Image"}
              </span>
              <input
                {...register("image")}
                type="file"
                className="hidden"
                accept=".jpg,.png,.jpeg"
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-main-btn/40 ml-2 text-[10px] font-black tracking-widest uppercase">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className={cn(inputStyles(errors.description), "resize-none")}
            placeholder="Describe the ingredients..."
          />
          {errors.description && (
            <span className="ml-2 text-[10px] font-bold text-red-500 uppercase">
              {errors.description.message as string}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isLoading || isUpdating}
            className="bg-main-btn hover:bg-main-btn-hover w-full rounded-2xl py-4 font-black tracking-tighter text-white uppercase italic shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading || isUpdating ? (
              <div className="flex items-center justify-center gap-2 italic">
                <Spinner /> Processing...
              </div>
            ) : editingProduct ? (
              "Update Product"
            ) : (
              "Save to Menu"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
