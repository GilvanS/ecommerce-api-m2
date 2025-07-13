export const formatCPF = (v) => {
  if (!v) return "";
  return v
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
};

export const formatCEP = (v) => {
  if (!v) return "";
  return v
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const formatExpiryDate = (v) => {
  if (!v) return "";
  return v
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 5);
};

export const formatCardNumber = (v) => {
  if (!v) return "";
  return v
    .replace(/\D/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

export const formatCurrency = (value) => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(0);
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};
