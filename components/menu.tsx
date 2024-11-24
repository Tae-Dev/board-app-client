"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import {
  UseFormSetValue
} from "react-hook-form";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

type ListType = {
  id: number | null;
  title: string;
};

type PropsType = {
  color?: string;
  borderColor?: string;
  variant?: any;
  lists: ListType[];
  setValue?: UseFormSetValue<any>;
  name?: string;
  value?: number | null | undefined;
  handleSelectPostTypeValue?: (id: number | "") => any
};

export default function MenuCustom(props: PropsType) {
  const { color, borderColor, variant, lists, name, setValue, value, handleSelectPostTypeValue } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if (value) {
      let index = lists.findIndex((f) => f.id == value);
      setSelectedIndex(index);
      setValue && name && setValue(name, lists[index]?.id || "");
    }
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEventHandler<HTMLLIElement>) => {
    setAnchorEl(null);
  };

  const handleSelect = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    handleSelectPostTypeValue && handleSelectPostTypeValue(lists[index]?.id || "")
    setValue && name && setValue(name, lists[index]?.id || "");
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant={variant || "outlined"}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: "transparent",
          color: color ? color : "#49A569",
          borderColor: borderColor ? borderColor : "#49A569",
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textTransform: 'capitalize'
        }}
      >
        {lists[selectedIndex]?.title}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {lists?.map((item, i) => (
          <MenuItem
            key={i}
            selected={i === selectedIndex}
            onClick={(e) => handleSelect(e, i)}
            disableRipple
          >
            {item.title}
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
}
