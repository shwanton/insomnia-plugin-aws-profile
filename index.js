import { promisify } from "util";
import * as awscred from "awscred";
const load = promisify(awscred.load);
var Attribute;
(function (Attribute) {
    Attribute["profileName"] = "profileName";
    Attribute["accessKeyId"] = "accessKeyId";
    Attribute["secretAccessKey"] = "secretAccessKey";
    Attribute["sessionToken"] = "sessionToken";
    Attribute["region"] = "region";
})(Attribute || (Attribute = {}));
const attributeOptions = () => {
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
        async run(context, attribute, name) {
            if (!name) {
                throw new Error("profile name is required");
            }
            try {
                const { credentials, region } = await load({ profile: name });
                if (attribute === Attribute.region) {
                    return region;
                }
                else {
                    return credentials[attribute];
                }
            }
            catch (e) {
                throw new Error("Error loading profile");
            }
        },
    },
];
