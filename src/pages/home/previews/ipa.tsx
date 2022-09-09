import { Button } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { useT } from "~/hooks";
import { objStore } from "~/store";
import { api, baseName } from "~/utils";
import { FileInfo } from "./info";

const Ipa = () => {
  const t = useT();
  const [installing, setInstalling] = createSignal(false);
  return (
    <FileInfo>
      <Button
        as="a"
        href={
          "itms-services://?action=download-manifest&url=" +
          `${api}/i/${encodeURIComponent(
            encodeURIComponent(objStore.raw_url)
          )}/${baseName(objStore.obj.name)}.plist`
        }
        onClick={() => {
          setInstalling(true);
        }}
      >
        {t(`home.preview.${installing() ? "installing" : "install"}`)}
      </Button>
    </FileInfo>
  );
};

export default Ipa;
