/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as assembly from "../assembly.js";
import type * as backfill from "../backfill.js";
import type * as chat from "../chat.js";
import type * as chatAnswer from "../chatAnswer.js";
import type * as constants from "../constants.js";
import type * as env from "../env.js";
import type * as internalMutations from "../internalMutations.js";
import type * as notes from "../notes.js";
import type * as organize from "../organize.js";
import type * as summarize from "../summarize.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  assembly: typeof assembly;
  backfill: typeof backfill;
  chat: typeof chat;
  chatAnswer: typeof chatAnswer;
  constants: typeof constants;
  env: typeof env;
  internalMutations: typeof internalMutations;
  notes: typeof notes;
  organize: typeof organize;
  summarize: typeof summarize;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
