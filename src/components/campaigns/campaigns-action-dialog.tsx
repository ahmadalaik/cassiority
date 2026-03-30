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
import { useCampaignStore } from "@/stores/use-campaign-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm, type ControllerRenderProps } from "react-hook-form";
import {
  type CreateCampaign,
  createCampaignSchema,
  type UpdateCampaign,
  updateCampaignSchema,
} from "@/schema/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon, UploadCloud, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Textarea } from "../ui/textarea";
import { CurrencyInput } from "../currency-input";
import { useCategories } from "@/hooks/public/use-categories";
import { useFundraiserCampaignActions } from "@/hooks/fundraiser/use-fundraiser-campaigns";

export default function CampaignsActionDialog() {
  const { open, currentRow: campaign, setOpen, setCurrentRow } = useCampaignStore();
  const { createCampaign, updateCampaign } = useFundraiserCampaignActions();
  const { data: categories } = useCategories();
  const [campaignImg, setCampaignImg] = useState("");

  const isOpen = open !== null && open !== "delete" && open !== "view";

  const handleClose = (open: boolean) => {
    setOpen(null);
    if (!open) {
      setTimeout(() => setCurrentRow(null), 300);
    }
  };

  const form = useForm<CreateCampaign | UpdateCampaign>({
    resolver: zodResolver(campaign ? updateCampaignSchema : createCampaignSchema),
    values: campaign
      ? {
          ...campaign,
        }
      : {
          title: "",
          description: "",
          category: {
            name: "",
          },
          deadline: "",
          image: undefined,
          targetAmount: 0n,
          status: "active",
        },
  });

  const onSubmit = async (data: CreateCampaign | UpdateCampaign) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined && value !== null && key !== "category") {
        formData.append(key, value as string);
      }
    });

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("category[name]", data.category.name);

    if (!campaign) {
      await createCampaign.mutateAsync(formData);
    }

    if (campaign) {
      await updateCampaign.mutateAsync({ id: campaign.id, data: formData });
    }

    form.reset();
    setCampaignImg("");
    handleClose(isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleClose(open)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{campaign ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
          <DialogDescription>
            {campaign ? "Update the campaign here. " : "Create new campaign here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 px-4 max-h-[50svh] overflow-y-auto">
          <form id="campaign-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-campaign-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="form-campaign-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <FieldGroup className="grid grid-cols-2">
                <Controller
                  name="category.name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-campaign-category">Category</FieldLabel>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger
                          id="category"
                          className="w-full"
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="targetAmount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-campaign-target-amount">
                        Funding Goal (Rp)
                      </FieldLabel>

                      <CurrencyInput
                        // {...field}
                        id="form-campaign-target-amount"
                        aria-invalid={fieldState.invalid}
                        value={field.value}
                        placeholder="Funding goal"
                        onValueChange={field.onChange}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Date */}
              <Controller
                name="deadline"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="col-span-1">
                    <FieldLabel>Deadline</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
                        <Button
                          type="button"
                          variant="outline"
                          className="justify-between font-normal"
                        >
                          {field.value ? format(field.value, "PPP") : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date?.toISOString());
                          }}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-campaign-desc">Description</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-campaign-desc"
                      aria-invalid={fieldState.invalid}
                      placeholder="Description"
                      autoComplete="off"
                      rows={3}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-campaign-image">Image (Optional)</FieldLabel>
                    {campaignImg && (
                      <div className="relative w-20! h-20">
                        <img
                          className="w-full h-full object-cover rounded-md transition-all ease-in-out duration-300"
                          src={campaignImg}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => setCampaignImg("")}
                          className="absolute top-1 right-1 bg-red-50 hover:bg-red-100 text-destructive border-none hover:text-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive z-10 cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <CampaignImageUpload field={field} setCampaignImg={setCampaignImg} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            form="campaign-form"
            disabled={createCampaign.isPending || updateCampaign.isPending}
          >
            {campaign ? "Save changes" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CampaignImageUpload({
  field,
  setCampaignImg,
}: {
  field: ControllerRenderProps<CreateCampaign | UpdateCampaign>;
  setCampaignImg: (img: string) => void;
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
      setCampaignImg(url);
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
      className="flex flex-col gap-4 items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 cursor-pointer hover:border-slate-500 py-5"
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
