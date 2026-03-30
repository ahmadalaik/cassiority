import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useGetCampaign } from "@/hooks/public/use-campaigns";
import { usePaymentMethods } from "@/hooks/public/use-payment-methods";
import { useUserActions } from "@/hooks/user/use-users";
import { formatCurrency } from "@/lib/utils";
import { type CreateDonation, createDonationSchema } from "@/schema/donation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, UploadCloud, User, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Footer } from "react-day-picker";
import { Controller, useForm, type ControllerRenderProps } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DonationConfirmationPage() {
  const { campaignSlug, amount } = useParams();
  const navigate = useNavigate();
  const [proofImg, setProofImg] = useState("");

  const { data: campaign } = useGetCampaign(campaignSlug || "");
  const { createDonation } = useUserActions();
  const { mutateAsync, isPending } = createDonation;

  const { data: payments } = usePaymentMethods();

  const form = useForm<CreateDonation>({
    resolver: zodResolver(createDonationSchema),
  });

  const onSubmit = async (data: CreateDonation) => {
    const formData = new FormData();
    formData.append("donor", data.donor);
    formData.append("amount", amount as string);

    if (data.transferProof && data.transferProof.length > 0) {
      formData.append("proof", data.transferProof[0]);
    }

    if (data.notes) {
      formData.append("notes", data.notes);
    }

    await mutateAsync({ campaignId: campaign?.id as number, data: formData });
    navigate("/");
  };

  if (!campaign) return;

  return (
    <>
      <Header />
      <main className="flex min-h-svh items-center">
        <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 py-4">
          <div className="w-full max-w-2xl grid grid-cols-1 gap-8 lg:gap-10 mx-auto bg-white px-6 py-12 rounded-2xl border">
            {/* Image */}
            <div className="flex gap-4 md:gap-6 items-center">
              <img
                src={
                  typeof campaign.image === "string"
                    ? campaign.image
                    : "https://images.unsplash.com/photo-1732800141005-2c59726e1961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                className="aspect-square w-30 md:w-40 object-cover rounded-xl"
              />
              <div>
                <h1 className="text-xl font-bold">{campaign.title}</h1>
                <p className="text-sm">
                  Target{" "}
                  <span className="text-lime-600 font-semibold">
                    {formatCurrency(campaign.targetAmount)}
                  </span>
                </p>
              </div>
            </div>

            {/* Donation */}
            <Field>
              <FieldLabel htmlFor="donation-amount">Your Donation</FieldLabel>
              <div className="bg-gray-200/55 font-bold px-6 py-3.5 rounded-xl">
                {formatCurrency(BigInt(amount as string))}
              </div>
            </Field>

            {/* Payment */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium">Send Payment to</p>
              {payments?.map((payment) => (
                <Card>
                  <CardContent className="flex flex-col gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
                      alt=""
                      className="h-6.5 md:h-8 self-start"
                    />
                    <div className="flex justify-between">
                      <p className="text-sm font-light">Bank Name</p>
                      <p className="text-sm font-semibold">{payment.provider}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm font-light">Account Number</p>
                      <p className="text-sm font-semibold">{payment.accountNumber}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm font-light">Account Name</p>
                      <p className="text-sm font-semibold">{payment.accountHolderName}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Form */}
            <form id="donation-confirmation-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="donor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-donation-confirmation-name">
                        Your Name
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="form-donation-confirmation-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="What's your name?"
                          autoComplete="off"
                        />
                        <InputGroupAddon>
                          <User />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="transferProof"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-donation-confirmation-proof">
                        Proof of Payment
                      </FieldLabel>
                      {proofImg && (
                        <div className="relative w-20! h-20">
                          <img
                            className="w-full h-full object-cover rounded-md transition-all ease-in-out duration-300"
                            src={proofImg}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            onClick={() => setProofImg("")}
                            className="absolute top-1 right-1 bg-red-50 hover:bg-red-100 text-destructive border-none hover:text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive z-10 cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <ProofImageUpload field={field} setProofImg={setProofImg} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="notes"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-donation-confirmation-notes">
                        Your Notes
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="form-donation-confirmation-proof"
                          aria-invalid={fieldState.invalid}
                          placeholder="Sharing a kidness"
                          className="self-start"
                          rows={5}
                        />
                        <InputGroupAddon className="self-start py-3.5">
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>

            <Button
              type="submit"
              form="donation-confirmation-form"
              disabled={isPending}
            >
              Confirm My Donation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="w-full max-w-2xl mx-auto px-6 md:px-0 pt-10">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="lg" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-6" />
        </Button>
        <p className="font-bold text-lg">#SendSupport</p>
        <p></p>
      </div>
    </nav>
  );
}

function ProofImageUpload({
  field,
  setProofImg,
}: {
  field: ControllerRenderProps<CreateDonation>;
  setProofImg: (img: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary/50", "bg-muted/50");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary/50", "bg-muted/50");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary/50", "bg-muted/50");
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast("maximum file 5 MB");
        return;
      }

      const url = URL.createObjectURL(file);
      setProofImg(url);
      field.onChange(e.target.files);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="flex flex-col gap-4 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 cursor-pointer hover:border-slate-500 py-6"
      onClick={handleAreaClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloud className="h-6 w-6 text-muted-foreground" />

      <div className="flex flex-col items-center gap-1">
        <h4 className="text-xs font-medium">Click or drag photo here</h4>
        <p className="text-[10px] font-normal">Format support JPG, PNG, WEBP (Max. 5MB)</p>
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept=".png, .jpg, .jpeg, .webp"
        className="hidden"
        onChange={handleFilesChange}
        onClick={handleClick}
      />
    </div>
  );
}
