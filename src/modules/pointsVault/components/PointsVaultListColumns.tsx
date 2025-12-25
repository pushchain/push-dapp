import { FC } from 'react';
import { Box, Text } from 'blocks';

const PointsVaultListColumns: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
    >
      <Box width="345px">
        <Text
          variant="c-bold"
          color="text-tertiary"
        >
          USER
        </Text>
      </Box>

      <Box width="345px">
        <Text
          variant="c-bold"
          color="text-tertiary"
        >
          TWITTER LINK
        </Text>
      </Box>

      <Box
        width="42px"
        justifyContent="center"
        display="flex"
      >
        <Text
          variant="c-bold"
          color="text-tertiary"
        >
          DISCORD USERNAME
        </Text>
      </Box>

      <Box
        width="42px"
        justifyContent="center"
        display="flex"
      >
        <Text
          variant="c-bold"
          color="text-tertiary"
        >
          EMAIL
        </Text>
      </Box>

      <Box
        width="245px"
        display="flex"
        justifyContent="center"
      >
        <Text
          variant="c-bold"
          color="text-tertiary"
        >
          ACTION
        </Text>
      </Box>
    </Box>
  );
};

export { PointsVaultListColumns };
