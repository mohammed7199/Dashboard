import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

PaletteColor.prototype[Symbol.iterator] = function* () {
    yield this.main;
    yield this.light;
    yield this.dark;
    yield this.tertiary; // Assuming `tertiary` is another shade like main, light, and dark
};

Palette.prototype[Symbol.iterator] = function* () {
    yield this.primary;
    yield this.secondary;
    yield this.error;
    yield this.warning;
    yield this.info;
    yield this.success;
    yield this.tertiary;
};