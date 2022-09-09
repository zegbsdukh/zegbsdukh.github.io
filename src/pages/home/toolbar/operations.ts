import { IconTypes } from "solid-icons";
import { TiDeleteOutline } from "solid-icons/ti";
import { CgRename } from "solid-icons/cg";
import { TbFileArrowRight } from "solid-icons/tb";
import { TbCopy, TbLink } from "solid-icons/tb";
import { AiTwotoneDelete } from "solid-icons/ai";
import { CgFileAdd, CgFolderAdd } from "solid-icons/cg";
import { AiOutlineCloudDownload } from "solid-icons/ai";

interface Operations {
  [key: string]: {
    icon: IconTypes;
    color?: string;
    p?: boolean;
  };
}
export const operations: Operations = {
  rename: { icon: CgRename, color: "$accent9" },
  copy: { icon: TbCopy, color: "$success9" },
  move: { icon: TbFileArrowRight, color: "$warning9" },
  delete: { icon: AiTwotoneDelete, color: "$danger9" },
  copy_link: { icon: TbLink, color: "$info9" },
  mkdir: { icon: CgFolderAdd, p: true },
  new_file: { icon: CgFileAdd, p: true },
  cancel_select: { icon: TiDeleteOutline },
  download: { icon: AiOutlineCloudDownload, color: "$primary9" },
};
// interface Operation {
//   label: string;
//   icon: IconTypes;
//   color?: string;
// }
// const operations: Operation[] = [
//   { label: "rename", icon: CgRename },
//   { label: "move", icon: OcFilemoved2 },
//   { label: "copy", icon: TbCopy },
//   { label: "delete", icon: AiOutlineDelete },
//   { label: "copy_url", icon: FiLink },
//   { label: "new_file", icon: CgFileAdd },
//   { label: "mkdir", icon: CgFolderAdd },
// ];
