import React, { useEffect, useState } from "react";
import useDashboard from "../../shared/hooks/useDahboard";
import {
  useCreateMenuMutation,
  useUpdateMenuMutation,
} from "../../shared/services/menuApi";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import Button from "../../shared/UIElements/button/Button";
import {
  addMenuSchema,
  updateMenuSchema,
} from "../../shared/schemas/menuSchemas";
import { toaster } from "../../shared/utils/toaster";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function AddMenuForm() {
  const { data: user } = useGetCurrentUserQuery();
  const [createMenu, { isLoading: isCreating }] = useCreateMenuMutation();
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const {
    dashboard: { editingMenu },
    closeMenuModal,
  } = useDashboard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editingMenu ? updateMenuSchema : addMenuSchema),
    values: {
      title: editingMenu?.title || "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (editingMenu) {
      reset({ title: editingMenu.title });
    }
  }, [editingMenu, reset]);

  const onSubmit = async (data: any) => {
    if (user?.role === "test-admin") {
      return toaster("warning", "Test admin cannot modify data.");
    }

    try {
      const fd = new FormData();
      fd.append("title", data.title);
      if (data.image?.[0]) {
        fd.append("image", data.image[0]);
      }

      if (editingMenu) {
        await updateMenu({ id: editingMenu._id, data: fd }).unwrap();
        toaster("success", "Menu updated successfully");
      } else {
        await createMenu(fd).unwrap();
        toaster("success", "Menu created successfully");
      }

      closeMenuModal();
      reset();
    } catch (error) {
      console.error(error);
      toaster("error", "An unexpected error occurred");
    }
  };

  return (
    <div className="bg-main-light text-text-dark rounded-xl p-6 shadow-lg">
      <h2 className="text-main-btn mb-6 text-center text-2xl font-bold uppercase">
        {editingMenu ? "Edit Menu" : "Create New Menu"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <input
            {...register("title")}
            type="text"
            placeholder="Menu Title"
            className={`input bg-main w-full border-2 outline-0 transition-colors ${errors.title ? "border-red-500" : "border-transparent"}`}
          />
          {errors.title && (
            <span className="text-xs text-red-500">
              {errors.title.message as string}
            </span>
          )}
        </div>

        {/* Image Input */}
        <div className="flex flex-col gap-1">
          <input
            {...register("image")}
            type="file"
            accept=".jpg,.png,.jpeg"
            className="file-input bg-main w-full"
          />
          {errors.image && (
            <span className="text-xs text-red-500">
              {errors.image.message as string}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-2 flex justify-end gap-3">
          <Button
            type="button"
            onClick={closeMenuModal}
            className="bg-gray-400 px-4 py-2 hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-main-btn hover:bg-main-btn-hover min-w-30 p-2"
          >
            {isCreating || isUpdating ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner /> <span>Saving...</span>
              </div>
            ) : editingMenu ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuForm;
