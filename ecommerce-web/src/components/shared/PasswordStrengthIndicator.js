import React, { useMemo } from "react";
import { CheckCircle } from "../shared/Icons";

export const PasswordStrengthIndicator = ({ password }) => {
  const checks = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  );
  const CheckItem = ({ valid, text }) => (
    <li
      className={`flex items-center transition-colors ${
        valid ? "text-green-600" : "text-slate-400"
      }`}
    >
      <CheckCircle className="h-4 w-4 mr-2" />
      <span>{text}</span>
    </li>
  );
  return (
    <ul className="text-sm space-y-1 mt-2">
      <CheckItem valid={checks.length} text="Mínimo de 8 caracteres" />
      <CheckItem valid={checks.uppercase} text="Uma letra maiúscula" />
      <CheckItem valid={checks.number} text="Um número" />
      <CheckItem valid={checks.special} text="Um caractere especial" />
    </ul>
  );
};
