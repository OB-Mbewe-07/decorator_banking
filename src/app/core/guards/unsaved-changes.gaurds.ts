import { CanDeactivateFn } from "@angular/router";
import { LobbyPageComponent } from "../../Banking/lobby.component/lobby.component";

export const unsavedChangesGaurd: CanDeactivateFn<LobbyPageComponent> = (component) => {
    if (component.hasUnsavedChanges()) {
        return confirm(
            'You have unsaved changes!\n\n' +
            'Are you sure you want to leave this page?'
        );
    }
    return true;
}