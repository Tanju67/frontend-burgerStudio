import React, { useEffect } from "react";
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
    <div className="bg-bg text-text-dark p-2 sm:p-4">
      {/* Header: Mor ve İtalik */}
      <h2 className="text-main-btn mb-8 text-center text-3xl font-black tracking-tighter uppercase italic">
        {editingMenu ? "Update Menu" : "Add to Kitchen"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Title Input Area */}
        <div className="flex flex-col gap-2">
          <label className="text-main-btn px-2 text-[10px] font-black tracking-widest uppercase italic">
            Menu Name
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="e.g. Signature Burgers"
            className={`bg-main/10 focus:bg-main/20 w-full rounded-2xl border-2 px-4 py-3 font-bold transition-all outline-none ${errors.title ? "border-red-500/50" : "border-main/20 focus:border-main"}`}
          />
          {errors.title && (
            <span className="px-2 text-[10px] font-bold text-red-500 uppercase">
              {errors.title.message as string}
            </span>
          )}
        </div>

        {/* Image Upload Area */}
        <div className="flex flex-col gap-2">
          <label className="text-main-btn px-2 text-[10px] font-black tracking-widest uppercase italic">
            Cover Image
          </label>
          <div className="group relative">
            <input
              {...register("image")}
              type="file"
              accept=".jpg,.png,.jpeg"
              className="file:bg-main file:text-main-btn hover:file:bg-main-btn bg-main/10 border-main/30 w-full cursor-pointer rounded-2xl border-2 border-dashed p-4 transition-all file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:italic hover:file:text-white"
            />
          </div>
          {errors.image && (
            <span className="px-2 text-[10px] font-bold text-red-500 uppercase">
              {errors.image.message as string}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-4">
          <Button
            type="button"
            onClick={closeMenuModal}
            className="bg-main text-main-btn hover:bg-main/80 flex-1 rounded-2xl py-3 font-black tracking-widest uppercase italic transition-all"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-main-btn hover:bg-main-btn/90 shadow-main-btn/20 flex-[2] rounded-2xl py-3 font-black tracking-widest text-white uppercase italic shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isCreating || isUpdating ? (
              <div className="flex items-center justify-center gap-3">
                <Spinner /> <span className="animate-pulse">Cooking...</span>
              </div>
            ) : editingMenu ? (
              "Update Kitchen"
            ) : (
              "Fire Up Menu"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuForm;
