import React, { useEffect, useState } from "react";
import { ActionIcon, RingProgress, Text, Center, rem } from "@mantine/core";
import { IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react";

export default function ProgressBar({ value, testResult }: { value: number; testResult: any }) {
  const [currentColor, setCurrentColor] = useState("yellow");

  useEffect(() => {
    console.log(testResult);
    if (testResult?.error) {
      setCurrentColor("red");
    } else if (value > 99 && testResult) {
      setCurrentColor("teal");
    } else if (value < 100 && !testResult) {
      setCurrentColor("blue");
    }
  }, [value, testResult]);

  return (
    <>
      {value < 100 ? (
        <RingProgress
          size={200}
          thickness={20}
          sections={[{ value: value, color: currentColor }]}
          label={
            <Text c="blue" fw={700} ta="center" size="xl">
              {value + "%"}
            </Text>
          }
        />
      ) : (
        <RingProgress
          size={200}
          thickness={20}
          sections={[{ value: 100, color: currentColor }]}
          label={
            <Center>
              <ActionIcon color={currentColor} variant="light" radius="xl" size="xl">
                {currentColor == "teal" && <IconCheck style={{ width: rem(22), height: rem(22) }} />}
                {currentColor == "yellow" && <IconX style={{ width: rem(22), height: rem(22) }} />}
                {currentColor == "red" && <IconX style={{ width: rem(22), height: rem(22) }} />}
                {currentColor == "blue" && <IconQuestionMark style={{ width: rem(22), height: rem(22) }} />}
              </ActionIcon>
            </Center>
          }
        />
      )}
    </>
  );
}
