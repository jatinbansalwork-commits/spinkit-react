import pkg from "../../package.json";

/** Next / current package version from the workspace root. */
export const PACKAGE_VERSION = pkg.version as string;

export const VERSION_LABEL = `v${PACKAGE_VERSION}`;
