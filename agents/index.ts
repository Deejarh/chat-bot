// register all agent files here
export * from "./deejarhBotAgent";

// and register types here
export type Agent = "deejarhBot";

// util function for creating trainings with proper typing
import type { CreateChatCompletionRequest } from "openai";
export default function createAgent(
  agent: (context: Record<string, any>) => Partial<CreateChatCompletionRequest>
) {
  return agent;
}