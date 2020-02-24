import { promisify } from "util";
import * as awscred from "awscred";

const load = promisify(awscred.load);

enum Attribute {
  profileName = "profileName",
  accessKeyId = "accessKeyId",
  secretAccessKey = "secretAccessKey",
  sessionToken = "sessionToken",
  region = "region",
}

const attributeOptions = (): any[] => {
  return [
    {
      displayName: Attribute.accessKeyId,
      value: Attribute.accessKeyId,
    },
    {
      displayName: Attribute.secretAccessKey,
      value: Attribute.secretAccessKey,
    },
    {
      displayName: Attribute.sessionToken,
      value: Attribute.sessionToken,
    },
    {
      displayName: Attribute.region,
      value: Attribute.region,
    },
  ];
};

module.exports.templateTags = [
  {
    name: "awsprofile",
    displayName: "AWS profile",
    description: "AWS credentials for profile",
    args: [
      {
        displayName: "Credential",
        description: "AWS credential from profile",
        type: "enum",
        options: attributeOptions(),
      },
      {
        displayName: "Profile",
        description: "Profile name",
        type: "string",
        defaultValue: "default",
      },
    ],
    async run(context: any, attribute: string, name: string): Promise<string> {
      if (!name) {
        throw new Error("profile name is required");
      }
      try {
        const { credentials, region } = await load({ profile: name });
        if (attribute === Attribute.region) {
          return region;
        } else {
          return credentials[attribute];
        }
      } catch (e) {
        throw new Error("Error loading profile");
      }
    },
  },
];
