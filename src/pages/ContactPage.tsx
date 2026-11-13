import { useLocation } from 'react-router-dom';
import type { ScopeTransferState } from '../components/ScopePlanner';
import {
  ProjectBriefSection,
  type SelectedPlanState,
} from '../components/ProjectBriefSection';

export function ContactPage() {
  const location = useLocation();
  const routeState = location.state as {
    scope?: ScopeTransferState;
    selectedPlan?: SelectedPlanState;
  } | null;

  return (
    <ProjectBriefSection
      id="contact-brief"
      headingAs="h1"
      initialScope={routeState?.scope}
      selectedPlan={routeState?.selectedPlan}
    />
  );
}
