import { world, BlockPermutation, PlayerInteractWithBlockAfterEvent } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

export class LanternSwitch {
    @methodEventSub(world.afterEvents.playerInteractWithBlock)
    interactWithBlock(args: PlayerInteractWithBlockAfterEvent) :void{
        const block = args.block;
        if (!block.hasTag("cfd:is_lantern")) return;
        const mainHand = args.itemStack;
        if (!mainHand || mainHand.typeId !=="minecraft:torch") return;
        block.setPermutation(block.permutation.withState('cfd:is_lighting', true));
    }
}