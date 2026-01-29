import {
  BlockCustomComponent,
  BlockComponentPlayerInteractEvent,
  BlockPermutation,
  Player,
  ItemStack,
  CustomComponentParameters,
} from "@minecraft/server";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

const STATE_IS_LIGHTING: keyof BlockStateSuperset = "cfd:is_lighting" as keyof BlockStateSuperset;

export class LanternComponent implements BlockCustomComponent {
  public constructor() {
    this.onPlayerInteract = this.onPlayerInteract?.bind(this);
  }

  public onPlayerInteract(arg0: BlockComponentPlayerInteractEvent, arg1: CustomComponentParameters): void {
    const block = arg0.block;

    const player: Player | undefined = arg0.player;
    if (player === undefined) {
      return;
    }

    const currentLightingState: boolean = block.permutation.getState(STATE_IS_LIGHTING) as boolean;

    const heldItem: ItemStack | undefined = arg0.player
      ?.getComponent("minecraft:inventory")
      ?.container.getItem(arg0.player.selectedSlotIndex);

    const isHoldingTorch: boolean = heldItem !== undefined && heldItem.typeId === "minecraft:torch";

    // If the player is holding a torch
    if (isHoldingTorch) {
      if (currentLightingState === false) {
        const newPermutation: BlockPermutation = block.permutation.withState(STATE_IS_LIGHTING, true);
        block.setPermutation(newPermutation);
      }

      return;
    }

    // If the player is not holding a torch
    if (currentLightingState === true) {
      const newPermutation: BlockPermutation = block.permutation.withState(STATE_IS_LIGHTING, false);
      block.setPermutation(newPermutation);
    }
  }
}
