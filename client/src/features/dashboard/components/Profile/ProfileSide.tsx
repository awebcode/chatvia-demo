import "../../pages/Dashboard.scss";

import { Images, profileMenu } from "../../../../constants";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { CustomAccordion } from "../../../../components/common/Accordion/Accordion";
import { CustomMenu } from "../../../../components/common/Menu/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { SideWrapper } from "../SideWrapper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export function ProfileSide() {
  return (
    <SideWrapper
      title="my profile"
      icon={
        <CustomMenu
          menu={profileMenu}
          direction="rtl"
          icon={<MoreVertIcon />}
        />
      }
    >
      <div className="profile-info flex-center capitalize">
        <Button component="label" variant="text" href="#file-upload">
          <img src={Images.avatar1} alt="avatar" />
          <VisuallyHiddenInput type="file" />
        </Button>

        <h5>patricia smith</h5>
        <p>
          <CheckCircleRoundedIcon fontSize="small" className="info-icon" />
          active
        </p>
      </div>

      <div className="profile-about">
        <div className="mb-2">
          <CustomAccordion
            panelOrder="panel1"
            title="About"
            preprendIcon={<PersonRoundedIcon fontSize="small" />}
          >
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </CustomAccordion>
        </div>

        <div className="">
          <CustomAccordion
            panelOrder="panel2"
            title="Attached Files"
            preprendIcon={<AttachFileRoundedIcon fontSize="small" />}
          >
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </CustomAccordion>
        </div>
      </div>
    </SideWrapper>
  );
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
