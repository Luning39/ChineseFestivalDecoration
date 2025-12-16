import { world, Block, PlayerInteractWithBlockAfterEvent, Player, ItemStack } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

export class LanternSwitch {
    @methodEventSub(world.afterEvents.playerInteractWithBlock)
    itemUseOn(args: PlayerInteractWithBlockAfterEvent) {
        const player = args.player;
        const block = args.block;
        const mainHand = args.itemStack;
        if (!block.hasTag("cfd:is_lantern")) return;
        // block.setPermutation(block.permutation.withState("cfd:is_lighting",ture));
        if (mainHand.typeId === "minecraft:torch") {
        }
    }
}