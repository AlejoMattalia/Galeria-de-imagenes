import { Button, styled } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export function TooltipIcon() {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      position: "relative",
      bottom: "18px"
    },
  }));
  return (
    <LightTooltip title="Subir imagen">
      <Button><DriveFolderUploadIcon style={{color: "#FFF", fontSize:"30px"}}/></Button>
    </LightTooltip>
  )
}
