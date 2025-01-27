import React from "react";

function Button({ children, variant, size, onClick, className }) {
  const baseStyles = "rounded-md font-semibold px-4 py-2 focus:outline-none focus:ring";
  const variantStyles = {
    "neutral-tertiary": "bg-gray-700 text-white hover:bg-gray-600",
    inverse: "bg-white text-black hover:bg-gray-200",
  };
  const sizeStyles = {
    large: "text-lg",
    default: "text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size || "default"]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Badge({ children, variant }) {
  const variantStyles = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-500 text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}

function IconWithBackground({ icon, size, variant }) {
  const sizeStyles = {
    large: "w-12 h-12",
    default: "w-8 h-8",
  };
  const variantStyles = {
    error: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
    default: "bg-gray-500",
  };

  return (
    <div
      className={`${sizeStyles[size || "default"]} ${variantStyles[variant || "default"]} rounded-full flex items-center justify-center text-white`}
    >
      <i className={icon}></i>
    </div>
  );
}

function LinkButton({ children, variant, onClick }) {
  const baseStyles = "rounded-md font-semibold px-4 py-2 focus:outline-none focus:ring";
  const variantStyles = {
    inverse: "bg-white text-black hover:bg-gray-200",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Home() {
  return (
    <div className="flex w-full flex-col items-center bg-neutral-900">
      <div className="container flex w-full max-w-[1280px] items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <img
            className="h-8 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1718999371/uploads/302/g5jou2tvabjzl7exoihk.png"
            alt="Peppr AI"
          />
          <span className="text-heading-2 font-heading-2 text-white">Peppr AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="neutral-tertiary">Problem</Button>
          <Button variant="neutral-tertiary">Solution</Button>
          <Button variant="inverse">Book a Demo</Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-24 py-24">
        <div className="container flex w-full max-w-[1280px] flex-col items-center gap-8">
          <Badge variant="success">Backed by Y Combinator</Badge>
          <div className="flex max-w-[768px] flex-col items-center gap-6">
            <span className="font-['Inter'] text-[48px] font-[700] leading-[48px] text-white text-center -tracking-[0.035em]">
              Turning Invisible Work into Institutional Wisdom
            </span>
            <span className="font-['Inter'] text-[24px] font-[500] leading-[32px] text-neutral-400 text-center -tracking-[0.025em]">
              AI-powered tools to capture knowledge, accelerate onboarding, and
              future-proof your organization.
            </span>
            <Button variant="inverse" size="large">
              Get Started
            </Button>
          </div>
        </div>
        <div className="container flex w-full max-w-[1280px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-heading-1 font-heading-1 text-white">The Problem</span>
            <span className="text-heading-3 font-heading-3 text-neutral-400">
              Organizations struggle with lost knowledge, inefficient onboarding, and limited process visibility.
            </span>
          </div>
          <div className="flex w-full flex-wrap items-start justify-center gap-8">
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground
                variant="error"
                size="large"
                icon="FeatherAlertTriangle"
              />
              <span className="text-heading-2 font-heading-2 text-white">
                90% of critical work is undocumented
              </span>
              <span className="text-body font-body text-neutral-400">
                Key knowledge is lost in Slack, meetings, and Jira tickets.
              </span>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground
                variant="warning"
                size="large"
                icon="FeatherDollarSign"
              />
              <span className="text-heading-2 font-heading-2 text-white">
                $47M annual productivity loss
              </span>
              <span className="text-body font-body text-neutral-400">
                Due to inefficient knowledge sharing and process delays.
              </span>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground size="large" icon="FeatherClock" />
              <span className="text-heading-2 font-heading-2 text-white">
                5.3 hours/week spent waiting
              </span>
              <span className="text-body font-body text-neutral-400">
                Employees waste valuable time searching for information.
              </span>
            </div>
          </div>
        </div>
        <div className="container flex w-full max-w-[1280px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-heading-1 font-heading-1 text-white">
              How The Virtual Employee Mind Works
            </span>
            <span className="text-heading-3 font-heading-3 text-neutral-400">
              A streamlined process to capture and leverage institutional knowledge
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-8">
            <div className="flex w-full items-start gap-8">
              <div className="flex items-center justify-center">
                <Badge>Step 1</Badge>
              </div>
              <div className="flex max-w-[1024px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-8 py-8">
                <IconWithBackground size="large" icon="FeatherDatabase" />
                <span className="text-heading-3 font-heading-3 text-white">
                  Data Collection &amp; Integration
                </span>
                <span className="text-body font-body text-neutral-400">
                  Our AI engine connects to your existing tools (Slack, Jira,
                  Confluence) and begins collecting conversations,
                  documentation, and workflow patterns in real-time.
                </span>
              </div>
            </div>
            <div className="flex w-full items-start gap-8">
              <div className="flex items-center justify-center">
                <Badge>Step 2</Badge>
              </div>
              <div className="flex max-w-[1024px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-8 py-8">
                <IconWithBackground size="large" icon="FeatherCpu" />
                <span className="text-heading-3 font-heading-3 text-white">
                  AI Analysis &amp; Processing
                </span>
                <span className="text-body font-body text-neutral-400">
                  Advanced NLP models analyze communications and documentation
                  to understand context, relationships, and critical knowledge
                  paths while building comprehensive knowledge graphs.
                </span>
              </div>
            </div>
            <div className="flex w-full items-start gap-8">
              <div className="flex items-center justify-center">
                <Badge>Step 3</Badge>
              </div>
              <div className="flex max-w-[1024px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-8 py-8">
                <IconWithBackground size="large" icon="FeatherZap" />
                <span className="text-heading-3 font-heading-3 text-white">
                  Knowledge Synthesis &amp; Distribution
                </span>
                <span className="text-body font-body text-neutral-400">
                  The system automatically generates searchable documentation,
                  interactive guides, and AI-powered assistants that help teams
                  find and use institutional knowledge effectively.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-heading-1 font-heading-1 text-white">
            Why Choose Peppr AI?
          </span>
          <span className="text-heading-3 font-heading-3 text-neutral-400">
            Future-proof your organization with AI-driven tools designed for
            growth and efficiency.
          </span>
          <div className="flex w-full flex-wrap items-start justify-center gap-8">
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground size="large" icon="FeatherDatabase" />
              <span className="text-heading-2 font-heading-2 text-white">
                Knowledge Capture
              </span>
              <span className="text-body font-body text-neutral-400">
                Seamlessly integrates with Slack, Jira, Otter.ai, and more to
                collect critical data. We help uncover organizational
                inefficiencies by having a more granular understanding of each
                individual&#39;s work.
              </span>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground
                variant="success"
                size="large"
                icon="FeatherUsers"
              />
              <span className="text-heading-2 font-heading-2 text-white">
                Accelerated Onboarding
              </span>
              <span className="text-body font-body text-neutral-400">
                Empower new hires with institutional knowledge from day one.
                Reduce offboarding time while increasing total documented
                knowledge by over 70%.
              </span>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-4 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-6 py-6">
              <IconWithBackground
                variant="warning"
                size="large"
                icon="FeatherTrendingUp"
              />
              <span className="text-heading-2 font-heading-2 text-white">
                Organizational Insights
              </span>
              <span className="text-body font-body text-neutral-400">
                Leverage AI to identify bottlenecks and optimize processes; a
                detailed knowledge base gives AI agents the context they need to
                operate 10x better.
              </span>
            </div>
          </div>
        </div>
        <div className="container flex w-full max-w-[1280px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-heading-1 font-heading-1 text-white">
              Simple, Transparent Pricing
            </span>
          </div>
          <div className="flex w-full flex-wrap items-start justify-center gap-8">
            <div className="flex max-w-[384px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-8 py-8">
              <div className="flex flex-col items-start gap-2">
                <span className="text-heading-3 font-heading-3 text-white">
                  Starter
                </span>
                <span className="text-heading-1 font-heading-1 text-white">
                  Free
                </span>
              </div>
              <Button
                className="h-10 w-full flex-none"
                variant="neutral-tertiary"
                size="large"
              >
                Get Started
              </Button>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-6 rounded-md border border-solid border-brand-600 bg-neutral-900 px-8 py-8">
              <Badge>Most Popular</Badge>
              <div className="flex flex-col items-start gap-2">
                <span className="text-heading-3 font-heading-3 text-white">
                  Professional
                </span>
                <span className="text-heading-1 font-heading-1 text-white">
                  $29/employee/month
                </span>
              </div>
              <Button
                className="h-10 w-full flex-none"
                variant="inverse"
                size="large"
              >
                Get Started
              </Button>
            </div>
            <div className="flex max-w-[384px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-800 bg-neutral-900 px-8 py-8">
              <div className="flex flex-col items-start gap-2">
                <span className="text-heading-3 font-heading-3 text-white">
                  Enterprise
                </span>
                <span className="text-heading-1 font-heading-1 text-white">
                  Custom
                </span>
              </div>
              <Button
                className="h-10 w-full flex-none"
                variant="neutral-tertiary"
                size="large"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex w-full max-w-[1280px] items-center justify-between border-t border-solid border-neutral-800 py-6">
        <span className="text-body font-body text-neutral-400">
          © 2025 Peppr AI. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          <LinkButton variant="inverse">Twitter</LinkButton>
          <LinkButton variant="inverse">Contact Us</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
