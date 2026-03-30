import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn, formatCurrency } from "@/lib/utils";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function DonationAmount() {
  const { campaignSlug } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      amount: "",
      presetAmount: "",
    },
  });

  // Watch untuk mendeteksi perubahan field secara real-time
  const watchAmount = useWatch({ control: form.control, name: "amount" });
  const watchPresetAmount = useWatch({ control: form.control, name: "presetAmount" });

  const finalDonationAmount = BigInt(watchAmount || watchPresetAmount) || 0n;

  const donationPreset = [
    { id: 1, amount: 10000n, label: "presetOne" },
    { id: 2, amount: 20000n, label: "presetTwo" },
    { id: 3, amount: 50000n, label: "presetThree" },
    { id: 4, amount: 100000n, label: "presetFour" },
  ];

  const onSubmit = (data: { amount: string; presetAmount: string }) => {
    const finalAmount = data.amount || data.presetAmount;

    // Validasi Manual: Pastikan ada nominal yang masuk
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      form.setError("amount", { type: "manual", message: "Select amount or fill manually" });
      form.setError("presetAmount", { type: "manual", message: "" });
      return;
    }

    console.log("Data Donasi Disimpan:", data);
    navigate(`/checkout/${campaignSlug}/${finalAmount}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <div className="lg:col-span-1 relative">
      <Card className="sticky top-28">
        <CardHeader>
          <CardTitle>Make a donation</CardTitle>
          <CardDescription>Choose an amount or enter your own</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <form id="form-donation" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Radio Group */}
              <Controller
                name="presetAmount"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("amount", ""); // Hapus input manual
                      form.clearErrors(["amount", "presetAmount"]); // Hapus error jika ada
                    }}
                    className="grid grid-cols-2 gap-3 max-w-sm"
                  >
                    {donationPreset.map((donation) => {
                      const isSelected = field.value === donation.amount.toString();
                      const hasError =
                        !!form.formState.errors.amount || !!form.formState.errors.presetAmount;

                      return (
                        <FieldLabel
                          key={donation.id}
                          htmlFor={donation.label}
                          className={cn("cursor-pointer", hasError ? "border-red-500" : "")}
                        >
                          <Field orientation="horizontal">
                            <FieldContent>
                              <FieldTitle
                                className={cn(
                                  "text-sm font-medium",
                                  hasError && !isSelected ? "text-red-500" : "",
                                )}
                              >
                                {formatCurrency(donation.amount)}
                              </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem
                              value={donation.amount.toString()}
                              id={donation.label}
                              className="sr-only"
                            />
                          </Field>
                        </FieldLabel>
                      );
                    })}
                  </RadioGroup>
                )}
              />

              {/* Custom Amount */}

              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-donation-amount">Custom Amount</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-donation-amount"
                        aria-invalid={fieldState.invalid}
                        type="number"
                        placeholder="Enter amount"
                        onChange={(e) => {
                          field.onChange(e);
                          // Selalu reset presetAmount ketika user mengubah custom amount field
                          form.setValue("presetAmount", "");
                          form.clearErrors(["amount", "presetAmount"]);
                        }}
                      />
                      <InputGroupAddon>Rp</InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          {/* Selected Amount Display */}
          {finalDonationAmount > 0 && (
            <div className="bg-accent rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Your donation</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(finalDonationAmount)}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" form="form-donation" className="w-full">
            Continue donation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
