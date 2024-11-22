

import ConvertTime from "@/utils/convertTime";
import { Box } from "@mui/material";

type propsType = {
  name: string;
  date: string;
};

export default function CustomNameList(props: propsType) {
  const { name, date } = props;

  return (
    <Box className="flex flex-row gap-2 items-center">
      <Box className="text-[14px] text-[#191919] font-medium">{name}</Box>
      <Box className="text-[12px] text-[#939494]">
        {date && <p>{ConvertTime(date)}</p>}
      </Box>
    </Box>
  );
}
