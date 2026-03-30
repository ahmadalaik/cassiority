import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input";

type CurrencyInputProps = Omit<NumericFormatProps, "value" | "onValueChange"> & {
  value?: bigint | null;
  onValueChange?: (value: bigint | null) => void;
};

export function CurrencyInput({ value, onValueChange, ...props }: CurrencyInputProps) {
  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      prefix="Rp"
      value={value ? value.toString() : ""}
      onValueChange={(values) => {
        if (!values.value) {
          onValueChange?.(null);
          return;
        }

        try {
          const bigintValue = BigInt(values.value);
          onValueChange?.(bigintValue);
        } catch {
          onValueChange?.(null);
        }
      }}
      {...props}
    />
  );
}
