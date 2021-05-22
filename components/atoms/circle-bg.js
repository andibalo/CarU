import { Box } from "@chakra-ui/react";

export const CircleBg = ({
  size = "800px",
  right = "-200px",
  bottom = "-200px",
  left,
  top,
}) => {
  return (
    <Box
      h={size}
      w={size}
      bg="brand.100"
      position="absolute"
      right={right}
      bottom={bottom}
      top={top}
      left={left}
      borderRadius="50%"
    />
  );
};
