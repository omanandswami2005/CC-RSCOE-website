/**
 * @fileoverview Configuration module for the server.
 * @description This module contains various configurations for the server application.
 */

// Importing dotenv module for environment variable loading
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuration object for the server.
 * @typedef {Object} Config
 * @property {Object} betterAuth - BetterAuth configuration.
 * @property {Object} betterAuth.github - GitHub OAuth configuration.
 * @property {string} betterAuth.github.clientId - GitHub client ID.
 * @property {string} betterAuth.github.clientSecret - GitHub client secret.
 * @property {Object} betterAuth.google - Google OAuth configuration.
 * @property {string} betterAuth.google.clientId - Google client ID.
 * @property {string} betterAuth.google.clientSecret - Google client secret.
 */

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
}

interface BetterAuthConfig {
  betterAuth: {
    github: OAuthConfig;
    google: OAuthConfig;
  };
}

const betterAuthConfig: BetterAuthConfig = {
  betterAuth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  }
};

export default betterAuthConfig;

