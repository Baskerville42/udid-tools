type AppleOsVersionInfo = {
  displayValue: string;
  copyValue: string;
  rawBuild?: string;
};

const APPLE_OS_BUILD_VERSIONS = {
  "21E236": "17.4.1",
  "22A3351": "18.0",
  "22A3354": "18.0",
  "22A3370": "18.0.1",
  "22B83": "18.1",
  "22B91": "18.1.1",
  "22C152": "18.2",
  "22C161": "18.2.1",
  "22D63": "18.3",
  "22D64": "18.3",
  "22D72": "18.3.1",
  "22D82": "18.3.2",
  "22E240": "18.4",
  "22E252": "18.4.1",
  "22F76": "18.5",
  "22G86": "18.6",
  "22G90": "18.6.1",
  "22G100": "18.6.2",
  "22H20": "18.7",
  "22H31": "18.7.1",
  "22H124": "18.7.2",
  "22H217": "18.7.3",
  "22H218": "18.7.4",
  "22H311": "18.7.5",
  "22H320": "18.7.6",
  "22H333": "18.7.7",
  "22H340": "18.7.7",
  "22H352": "18.7.8",
  "22H355": "18.7.8",
} as const;

const FORMATTED_VERSION_PATTERN = /^(iOS|iPadOS)\s+(\d+(?:\.\d+){0,2})(?:\s+\(([^)]+)\))?$/i;

function getAppleOsName(productIdentifier: string, version: string): "iOS" | "iPadOS" | "OS" {
  if (productIdentifier.startsWith("iPhone")) return "iOS";
  if (!productIdentifier.startsWith("iPad")) return "OS";

  const [major = 0, minor = 0] = version.split(".").map((part) => Number(part));
  return major > 13 || (major === 13 && minor >= 1) ? "iPadOS" : "iOS";
}

export function formatAppleOsVersion(
  productIdentifier: string,
  rawVersion: string
): AppleOsVersionInfo {
  const value = rawVersion.trim();
  if (!value) return { displayValue: "", copyValue: "" };

  const formattedVersion = FORMATTED_VERSION_PATTERN.exec(value);
  if (formattedVersion) {
    const platform = formattedVersion[1];
    const version = formattedVersion[2];
    const rawBuild = formattedVersion[3];
    const displayValue = `${platform} ${version}`;

    return {
      displayValue,
      copyValue: rawBuild ? `${displayValue} (${rawBuild})` : displayValue,
      rawBuild,
    };
  }

  const version = APPLE_OS_BUILD_VERSIONS[value as keyof typeof APPLE_OS_BUILD_VERSIONS];
  if (!version) {
    return {
      displayValue: `Build ${value}`,
      copyValue: value,
      rawBuild: value,
    };
  }

  const displayValue = `${getAppleOsName(productIdentifier, version)} ${version}`;
  return {
    displayValue,
    copyValue: `${displayValue} (${value})`,
    rawBuild: value,
  };
}
