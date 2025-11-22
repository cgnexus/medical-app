import { StateGraph, START, END } from "@langchain/langgraph"
import { AgentStateDefinition } from "./schema"
import { extractData, saveResults } from "./nodes"

export const graph = new StateGraph(AgentStateDefinition)
    .addNode("extract_data", extractData)
    .addNode("save_results", saveResults)
    .addEdge(START, "extract_data")
    .addEdge("extract_data", "save_results")
    .addEdge("save_results", END)
    .compile()
