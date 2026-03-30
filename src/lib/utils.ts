import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { centerCrop, makeAspectCrop, type Crop } from "react-image-crop";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: bigint) {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(amount);

  return `Rp${formattedNumber}`;
}

export function handleApiError(
  error: unknown,
  defaultMessage: string = "Something went wrong",
) {
  let message = defaultMessage;

  if (isAxiosError(error)) {
    message = error.response?.data?.message || error.message || defaultMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
}

export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
