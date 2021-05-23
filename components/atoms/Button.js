import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({ variant = "solid", children, ml, onClick }) => {
  return (
    <ChakraButton
      onClick={onClick}
      bg={variant === "outline" ? "transparent" : "brand.100"}
      borderColor="brand.100"
      color={variant === "outline" ? "brand.100" : "white"}
      ml={ml}
      variant={variant}
    >
      {children}
    </ChakraButton>
  );
};
