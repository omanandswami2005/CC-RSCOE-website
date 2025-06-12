import { betterAuth } from "better-auth";
import { MongoClient, ObjectId, Db } from "mongodb";
import betterAuthConfig from "../betterAuthConfig/config";
import constants from "../constants";
import config from "../config/env";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

interface User {
  id: string;
  [key: string]: any;
}

interface ProfileDocument {
  userId: ObjectId;
  bio: string;
  createdAt: Date;
}

const client: MongoClient = new MongoClient(
  `mongodb+srv://om:omswami2005@atlascluster.zo09joq.mongodb.net/coding_club`
);
const db: Db = client.db();

const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      profileId: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: User) => {
          // Optional: Modify user data before creation
          return { data: { ...user } };
        },
        after: async (user: User) => {
          // console.log("User created:", user);
          // Create a profile document in the profiles collection
          try {
            const profileDocument: ProfileDocument = {
              userId: new ObjectId(user.id), // Reference to the user
              bio: "", // Default empty bio
              createdAt: new Date(), // Timestamp
            };

            const profileResult = await db
              .collection("profiles")
              .insertOne(profileDocument);
            const profileId = profileResult.insertedId;
            // console.log("Profile created with ID:", profileId);

            // Update the User document with the profileId
            await db
              .collection("user")
              .updateOne(
                { _id: new ObjectId(user.id) },
                { $set: { profileId } }
              );
          } catch (error) {
            console.error("Error creating profile document:", error);
            throw error;
          }
        },
      },
    },
  },
  trustedOrigins: [
    "https://onrender.com",
    `${constants?.clientUrl}`,
    `${constants?.serverUrl}`,
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: betterAuthConfig?.betterAuth?.github?.clientId,
      clientSecret: betterAuthConfig?.betterAuth?.github?.clientSecret,
    },
    google: {
      clientId: betterAuthConfig?.betterAuth?.google?.clientId,
      clientSecret: betterAuthConfig?.betterAuth?.google?.clientSecret,
    },
  },
});

export default auth;
