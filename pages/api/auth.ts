import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_HOSTNAME,
  APP_HOSTNAME,
} from "../../lib/appwrite";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    // You could get email and password here
    // const { email, password } = req.body;

    // TODO: Forward location headers
    const request = await fetch(
      APPWRITE_ENDPOINT + "/account/sessions/anonymous",
      {
        method: "POST",
        headers: {
          "x-appwrite-project": APPWRITE_PROJECT_ID,
        },
      }
    );

    const response = await request.json();

    const cookie = (request.headers.get("set-cookie") ?? "")
      .split("." + APPWRITE_HOSTNAME)
      .join("." + APP_HOSTNAME);

    res.setHeader("set-cookie", cookie);
    res.status(200).json({
      ...response,
    });
  } else {
    res.status(404);
  }
}
