import {
  DELIVERED,
  DELIVERING,
  READY_FOR_PICKUP,
  ORDER_FINISHED,
} from "./constants";

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const orderStatusColorResolver = (orderStatus) => {
  switch (orderStatus) {
    case DELIVERING:
      return "cyan.400";
    case DELIVERED:
      return "yellow.400";
    case READY_FOR_PICKUP:
      return "brand.100";
    case ORDER_FINISHED:
      return "green.400";
    default:
      return "brand.100";
  }
};
