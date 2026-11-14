import { useLocation } from 'react-router-dom';
import { ContactSection } from '../components/ContactSection';
import type { ScopeTransferState } from '../components/ScopePlanner';
import type { SelectedPlanState } from '../components/ProjectBriefSection';

export function ContactPage() {
  const location = useLocation();
  const routeState = location.state as {
    scope?: ScopeTransferState;
    selectedPlan?: SelectedPlanState;
  } | null;

  return (
    <ContactSection
      id="contact"
      selectedPlan={routeState?.selectedPlan}
      initialScope={routeState?.scope}
    />
  );
}
