interface BreadcrumbProps {
  currentStep: number;
}

const steps = ["Upload CV", "Review & Style", "Customize", "Go Live"];

export function Breadcrumb({ currentStep }: BreadcrumbProps) {
  return (
    <div
      className="flex items-center justify-center gap-0"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              style={{
                backgroundColor: isActive || isCompleted ? "#7F6269" : "transparent",
                border: isActive || isCompleted ? "none" : "1.5px solid #BDB8B9",
                color: isActive || isCompleted ? "#F4E1E0" : "#BDB8B9",
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 18px",
                borderRadius: "999px",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              {isCompleted ? (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#F4E1E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {step}
                </span>
              ) : (
                step
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  backgroundColor: isCompleted ? "#7F6269" : "rgba(189,184,185,0.4)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
