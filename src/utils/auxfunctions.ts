interface alertsauxparameters {
  elementsid: string[];
  effect: boolean;
  page?: string;
  exeptionspages?: {
    id: string;
    pagename: string;
  }[];
}
export function Alertaux({
  effect,
  elementsid,
  page,
  exeptionspages,
}: alertsauxparameters) {
  let listcontrol = elementsid;

  listcontrol.forEach((i) => {
    const element = document.getElementById(i) as HTMLElement;
    element &&
      (function () {
        element.style.position = effect ? "relative" : "static";
        element.style.zIndex = effect ? "-1" : "50";
      })();
  });

  //special cases
  exeptionspages?.forEach((i) => {
    const element = document.getElementById(i.id) as HTMLElement;
    element &&
      (function () {
        if (effect && page !== i.pagename) {
          element.style.position = "relative";
          element.style.zIndex = "-1";
        } else {
          element.style.position = "static";
          element.style.zIndex = "50";
        }
      })();
  });
  ////essencials
  const body = document.getElementById("Body") as HTMLElement;
  const nav = document.getElementById("menunav") as HTMLElement;
  const menucontainer = document.getElementById("menucontainer") as HTMLElement;

  body.style.overflow = effect ? "hidden" : "auto";
  nav.style.zIndex = effect ? "-1" : "50";
  menucontainer.style.zIndex = effect ? "-1" : "50";
}
