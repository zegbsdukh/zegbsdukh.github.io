import { Box, Flex, VStack, Image, Anchor } from "@hope-ui/solid";
import { For, onCleanup, onMount } from "solid-js";
import { useRouter, useLink } from "~/hooks";
import { getSettingBool, objStore } from "~/store";
import { ObjType } from "~/types";
import { convertURL, ext } from "~/utils";
import Artplayer from "artplayer";
import flvjs from "flv.js";
import Hls from "hls.js";
import { currentLang } from "~/app/i18n";
import { SelectWrapper } from "~/components";
import { isMobile } from "~/utils/compatibility";

const players: { icon: string; scheme: string }[] = [
  { icon: "iina", scheme: "iina://weblink?url=$url" },
  { icon: "potplayer", scheme: "potplayer://$e_url" },
  { icon: "vlc", scheme: "vlc://$url" },
  { icon: "nplayer", scheme: "nplayer-$url" },
  {
    icon: "mxplayer",
    scheme:
      "intent:$url#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end",
  },
  {
    icon: "mxplayer-pro",
    scheme:
      "intent:$url#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end",
  },
];

const Preview = () => {
  const { replace } = useRouter();
  const { proxyLink } = useLink();
  let videos = objStore.objs.filter((obj) => obj.type === ObjType.VIDEO);
  if (videos.length === 0) {
    videos = [objStore.obj];
  }
  let player: Artplayer;
  let option: any = {
    id: "player",
    container: "#video-player",
    url: objStore.raw_url,
    title: objStore.obj.name,
    volume: 0.5,
    autoplay: getSettingBool("video_autoplay"),
    autoSize: false,
    autoMini: true,
    loop: false,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    setting: true,
    hotkey: true,
    pip: true,
    mutex: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: false,
    playsInline: true,
    // layers: [],
    // settings: [],
    // contextmenu: [],
    // controls: [],
    quality: [],
    // highlight: [],
    plugins: [],
    whitelist: [],
    // subtitle:{}
    moreVideoAttr: {
      // @ts-ignore
      "webkit-playsinline": true,
      playsInline: true,
    },
    type: ext(objStore.obj.name),
    customType: {
      flv: function (video: HTMLMediaElement, url: string) {
        const flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            url: url,
          },
          { referrerPolicy: "same-origin" }
        );
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
      },
      m3u8: function (video: HTMLMediaElement, url: string) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      },
    },
    lang: ["en", "zh-cn", "zh-tw"].includes(currentLang().toLowerCase())
      ? (currentLang().toLowerCase() as any)
      : "en",
    lock: true,
    fastForward: true,
    autoPlayback: true,
    autoOrientation: true,
    airplay: true,
  };
  if (isMobile) {
    option.moreVideoAttr.controls = true;
  }
  const subtitle = objStore.related.find((obj) => {
    for (const ext of [".srt", ".ass", ".vtt"]) {
      if (obj.name.endsWith(ext)) {
        return true;
      }
    }
    return false;
  });
  if (subtitle) {
    option.subtitle = {
      url: proxyLink(subtitle, true),
      type: ext(subtitle.name) as any,
    };
  }
  onMount(() => {
    player = new Artplayer(option);
    player.on("video:ended", () => {
      const index = videos.findIndex((f) => f.name === objStore.obj.name);
      if (index < videos.length - 1) {
        replace(videos[index + 1].name);
      }
    });
  });
  onCleanup(() => {
    player?.destroy();
  });
  return (
    <VStack w="$full" spacing="$2">
      <Box w="$full" h="60vh" id="video-player" />
      <SelectWrapper
        onChange={(name: string) => {
          replace(name);
        }}
        value={objStore.obj.name}
        options={videos.map((obj) => ({ value: obj.name }))}
      />
      <Flex wrap="wrap" gap="$2" justifyContent="center">
        <For each={players}>
          {(item) => {
            return (
              <Anchor
                // external
                href={convertURL(
                  item.scheme,
                  objStore.raw_url,
                  objStore.obj.name
                )}
              >
                <Image boxSize="$8" src={`/images/${item.icon}.webp`} />
              </Anchor>
            );
          }}
        </For>
      </Flex>
    </VStack>
  );
};

export default Preview;
