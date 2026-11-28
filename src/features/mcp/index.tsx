import { McpCliAndPromptsSection } from "./cli-prompts";
import { McpClientSetup } from "./client-setup";
import { McpQuerySandbox } from "./query-sandbox";
import { McpSkillGuardrailsSection } from "./skill-guardrails";

export function McpFeatureView() {
  return (
    <div>
      <McpClientSetup />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <McpCliAndPromptsSection />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <McpSkillGuardrailsSection />
      <div className="wireframe-spacer">
        <div className="wireframe-spacer-inner" />
      </div>
      <McpQuerySandbox />
    </div>
  );
}
