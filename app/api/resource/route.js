import { NextResponse } from "next/server";
import fs from "fs";

import User from "@/models/user";
import Subscription from "@/models/subscription";
import { getServerSession } from "next-auth";
import { terraformExec } from "@/lib/terraformExec";

export async function POST(req, res) {
  try {
    const session = await getServerSession();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });

    const values = await req.json();
    const subscription = await Subscription.findById(values.subscriptionId);
    if (!subscription) {
      return NextResponse.json({
        error: "Subscription not found",
        status: 404,
      });
    }

    // Update the provider file
    let providerData = await fs.promises.readFile(
      "./terraform/_provider.tf",
      "utf-8"
    );
    providerData = providerData.replace(
      "@@subscription_id@@",
      subscription.subscriptionId
    );
    providerData = providerData.replace("@@tenant_id@@", subscription.tenantId);
    providerData = providerData.replace("@@client_id@@", subscription.clientId);
    providerData = providerData.replace(
      "@@client_secret@@",
      subscription.clientSecret
    );
    await fs.promises.writeFile(
      "./terraform/_provider.tf",
      providerData,
      "utf-8"
    );

    // Update or Create <resource_name>.tf file according to type and values
    let templateData = await fs.promises.readFile(
      `./terraform/templates/${values.type}.tf`,
      "utf-8"
    );
    let newFile = templateData;

    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key) && key !== "type") {
        const value = values[key];
        newFile = newFile.replaceAll(`@@${key}@@`, `${value}`);
      }
    }

    await fs.promises.writeFile(
      `./terraform/resources/${values.resourceName}.tf`,
      newFile,
      "utf-8"
    );

    console.log("Exec in progress.");
    const result = await terraformExec();

    console.log("Exec completed successfully.");
    console.log("RESULT:\n", result);

    // Additional handling or DB operations here

    return NextResponse.json({
      msg: "Resource created successfully.",
      status: 201,
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);

    // Handle errors or clean-up operations here

    return NextResponse.json({
      error: "Resource creation failed.",
      status: 422,
    });
  }
}

/*

    // import { NextResponse } from "next/server";
// const fs = require("fs");

// import User from "@/models/user";
// import Subscription from "@/models/subscription";
// import { getServerSession } from "next-auth";
// import { terraformExec } from "@/lib/terraformExec";

// export async function POST(req, res) {
//   try {
//     const session = await getServerSession();
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });

//     const values = await req.json();
//     // console.log("VALUES: ", values);
//     const subscription = await Subscription.findById(values.subscriptionId);
//     if (!subscription) {
//       return NextResponse.json({
//         error: "Subscription not found",
//         status: 404,
//       });
//     }

//     // Update the provider file
//     fs.readFile("./terraform/_provider.tf", "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//       }

//       data = data.replace("@@subscription_id@@", subscription.subscriptionId);
//       data = data.replace("@@tenant_id@@", subscription.tenantId);
//       data = data.replace("@@client_id@@", subscription.clientId);
//       data = data.replace("@@client_secret@@", subscription.clientSecret);

//       fs.writeFile("./terraform/_provider.tf", data, "utf-8", (error) => {
//         if (error) {
//           return console.log(error);
//         }
//       });
//     });

//     // Update or Create <resource_name>.tf file acc. to type and values
//     fs.readFile(
//       `./terraform/templates/${values.type}.tf`,
//       "utf-8",
//       (err, data) => {
//         if (err) {
//           console.log(err);
//         }

//         const bodyObject = values;
//         let newFile = data;

//         for (const key in bodyObject) {
//           if (Object.hasOwnProperty.call(bodyObject, key)) {
//             const value = bodyObject[key];

//             if (key != "type") {
//               newFile = newFile.replaceAll(`@@${key}@@`, `${value}`);
//             }
//           }
//         }

//         fs.writeFile(
//           `./terraform/resources/${values.resourceName}.tf`,
//           newFile,
//           "utf-8",
//           (error) => {
//             if (error) {
//               return console.log(error);
//             }
//           }
//         );
//       }
//     );

//     console.log("Exec in progress.");
//     await terraformExec()
//       .then(async (result) => {
//         console.log("Exec completed successfully.");
//         console.log("RESULT:\n", result);
//         fs.readFile("./terraform/_provider.tf", "utf-8", (err, data) => {
//           if (err) {
//             console.log(err);
//           }
//           data = data.replace(
//             subscription.subscriptionId,
//             "@@subscription_id@@"
//           );
//           data = data.replace(subscription.tenantId, "@@tenant_id@@");
//           data = data.replace(subscription.clientId, "@@client_id@@");
//           data = data.replace(subscription.clientSecret, "@@client_secret@@");

//           fs.writeFile("./terraform/_provider.tf", data, "utf-8", (error) => {
//             if (error) {
//               return console.log(error);
//             }
//           });
//         });

//         return NextResponse.json({
//           msg: "Resource created successfully.",
//           status: 201,
//         });
//       })
//       .catch((error) => {
//         //Delete file in case of error
//         console.log("Exec completed unsuccessfully.");
//         console.error("ERROR:\n", error);
//         fs.readFile("./terraform/_provider.tf", "utf-8", (err, data) => {
//           if (err) {
//             console.log(err);
//           }
//           data = data.replace(
//             subscription.subscriptionId,
//             "@@subscription_id@@"
//           );
//           data = data.replace(subscription.tenantId, "@@tenant_id@@");
//           data = data.replace(subscription.clientId, "@@client_id@@");
//           data = data.replace(subscription.clientSecret, "@@client_secret@@");

//           fs.writeFile("./terraform/_provider.tf", data, "utf-8", (error) => {
//             if (error) {
//               return console.log(error);
//             }
//           });
//         });
//         return NextResponse.json({
//           error: "Resource creation failed.",
//           status: 422,
//         });
//       });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ error: "Internal Error", status: 500 });
//   }
//   return NextResponse.json({
//     msg: "Done",
//     status: 200,
//   });
// }

*/
