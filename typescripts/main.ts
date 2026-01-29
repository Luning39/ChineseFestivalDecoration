import { system, StartupEvent } from "@minecraft/server";
import { LanternComponent } from "./BlockCustomComponents/LanternComponent";

system.beforeEvents.startup.subscribe((event: StartupEvent): void => {
  event.blockComponentRegistry.registerCustomComponent("cfd:is_lantern", new LanternComponent());
});
