import { useState, useCallback } from "react";

export const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return true;

      let isValid = true;
      let errorMessage = "";

      if (rules.required && !value) {
        isValid = false;
        errorMessage = "Este campo é obrigatório.";
      } else if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Deve ter no mínimo ${rules.minLength} caracteres.`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.errorMessage || "Formato inválido.";
      } else if (rules.validator && !rules.validator(value)) {
        isValid = false;
        errorMessage = rules.errorMessage || "Valor inválido.";
      }

      if (!isValid) {
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
      return isValid;
    },
    [validationRules]
  );

  const handleInputChange = useCallback(
    (e) => {
      let { name, value } = e.target;
      const rules = validationRules[name];

      if (rules?.mask) {
        value = rules.mask(value);
      }

      setValues((prev) => ({ ...prev, [name]: value }));
      validate(name, value);
    },
    [validate, validationRules]
  );

  const isFormValid = () => {
    let isOverallValid = true;
    const newErrors = {};
    for (const field in validationRules) {
      if (validationRules[field].required || values[field]) {
        if (!validate(field, values[field])) {
          isOverallValid = false;
          newErrors[field] = errors[field] || "Campo inválido.";
        }
      }
    }
    setErrors(newErrors);
    return isOverallValid;
  };

  return { values, errors, handleInputChange, isFormValid, setValues };
};
