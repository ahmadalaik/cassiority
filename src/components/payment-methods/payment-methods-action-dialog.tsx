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
import { usePaymentMethodStore } from "@/stores/use-payment-method-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import {
  type CreatePaymentMethod,
  createPaymentMethodSchema,
  type UpdatePaymentMethod,
  updatePaymentMethodSchema,
} from "@/schema/payment-method";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useAdminPaymentMethodActions } from "@/hooks/admin/use-admin-payment-methods";

export default function PaymentMethodsActionDialog() {
  const { open, currentRow: paymentMethod, setOpen, setCurrentRow } = usePaymentMethodStore();
  const { createPaymentMethod, updatePaymentMethod } = useAdminPaymentMethodActions();

  const isOpen = open !== null && open !== "delete" && open !== "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const form = useForm<CreatePaymentMethod | UpdatePaymentMethod>({
    resolver: zodResolver(
      paymentMethod ? updatePaymentMethodSchema : createPaymentMethodSchema,
    ),
    values: {
      ...(paymentMethod && { id: paymentMethod.id }),
      type: paymentMethod?.type || "",
      provider: paymentMethod?.provider || "",
      accountNumber: paymentMethod?.accountNumber || "",
      accountHolderName: paymentMethod?.accountHolderName || "",
    },
  });

  const onSubmit = async (data: CreatePaymentMethod | UpdatePaymentMethod) => {
    if (!paymentMethod) {
      await createPaymentMethod.mutateAsync(data);
    }

    if (paymentMethod) {
      await updatePaymentMethod.mutateAsync({ ...data, id: paymentMethod.id });
    }

    form.reset();
    handleClose(isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {paymentMethod ? "Edit Payment Method" : "Create Payment Method"}
          </DialogTitle>
          <DialogDescription>
            {paymentMethod
              ? "Update the payment method here. "
              : "Create new payment method here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form id="payment-method-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-payment-method-type">Type</FieldLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-payment-method-type"
                      className="w-full"
                      ref={field.ref}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="e-wallet">E-Wallet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <FieldGroup className="grid grid-cols-2">
              <Controller
                name="provider"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-payment-method-provider">Provider</FieldLabel>
                    <Input
                      {...field}
                      id="form-payment-method-provider"
                      aria-invalid={fieldState.invalid}
                      placeholder="Provider"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="accountNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-payment-method-account-number">
                      Account Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-payment-method-account-number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Account Number"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <Controller
              name="accountHolderName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-payment-method-account-holder-name">
                    Account Holder Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-payment-method-account-holder-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Account Holder Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="payment-method-form"
            disabled={createPaymentMethod.isPending || updatePaymentMethod.isPending}
          >
            {paymentMethod ? "Save changes" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
