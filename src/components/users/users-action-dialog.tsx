import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaymentMethodActions } from "@/hooks/use-payment-methods";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useUserStore } from "@/stores/use-users-store";
import {
  createUserSchema,
  type CreateUser,
  updateProfileUserSchema,
  type UpdateUserProfile,
} from "@/schema/user";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function UsersActionDialog() {
  const { open, currentRow: user, setOpen, setCurrentRow } = useUserStore();
  const { createPaymentMethod, updatePaymentMethod } = usePaymentMethodActions();
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = open !== null && open !== "delete" && open !== "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const form = useForm<CreateUser | UpdateUserProfile>({
    resolver: zodResolver(user ? updateProfileUserSchema : createUserSchema),
    values: {
      ...(user && { id: user.id }),
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "",
    },
  });

  const onSubmit = async (data: CreateUser | UpdateUserProfile) => {
    try {
      if (!user) {
        // await createPaymentMethod.mutateAsync(data);
      }

      if (user) {
        // await updatePaymentMethod.mutateAsync({ ...data, id: currentRow.id });
      }

      form.reset();
      handleClose(isOpen);
    } catch {
      // toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {user ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form id="user-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-user-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-role">Role</FieldLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-user-role"
                      className="w-full"
                      ref={field.ref}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue
                        placeholder="Select a role"
                        aria-invalid={fieldState.invalid}
                      />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="fundraiser">Fundraiser</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-user-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-user-password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-user-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Name"
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="user-form"
            disabled={createPaymentMethod.isPending || updatePaymentMethod.isPending}
          >
            {user ? "Save changes" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
