import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  variant = "solid",
  children,
  ml,
  onClick,
  fullWidth = false,
  leftIcon,
}) => {
  return (
    <ChakraButton
      onClick={onClick}
      leftIcon={leftIcon}
      bg={variant === "outline" ? "transparent" : "brand.100"}
      borderColor="brand.100"
      color={variant === "outline" ? "brand.100" : "white"}
      ml={ml}
      variant={variant}
      flex={fullWidth ? "1" : null}
    >
      {children}
    </ChakraButton>
  );
};
