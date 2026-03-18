import React from "react";
import {
  ExternalLink,
  CheckCircle2,
  Calendar,
  BarChart3,
  Users,
  Sparkles,
} from "lucide-react";

const AIProjects = () => {
  const handleRedirect = () => {
    window.location.href = "https://project-mgt-ruby.vercel.app/";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-6">
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#C341F6] to-[#8E37EB] px-8 py-6">
          <div className="flex items-center gap-3 text-white">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AI Project Hub</h1>
          </div>
          <p className="text-white/90 mt-2 max-w-2xl">
            Seamlessly manage projects, track tasks, and boost team productivity with AI‑powered insights.
          </p>
        </div>

        {/* Content Grid */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          {/* Left Column - Features */}
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#8E37EB]" />
              Why choose AI Project Hub?
            </h2>
            <div className="space-y-4">
              <FeatureItem
                icon={CheckCircle2}
                title="Smart Task Management"
                description="Create, assign, and prioritize tasks with AI suggestions."
              />
              <FeatureItem
                icon={Users}
                title="Real‑time Collaboration"
                description="Chat, share files, and work together seamlessly."
              />
              <FeatureItem
                icon={BarChart3}
                title="AI‑Powered Analytics"
                description="Get insights on productivity, bottlenecks, and forecasts."
              />
              <FeatureItem
                icon={Calendar}
                title="Integrated Calendar"
                description="Visualize deadlines and milestones at a glance."
              />
            </div>

            {/* Stats Preview (optional) */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#8E37EB]">10k+</p>
                <p className="text-xs text-gray-500">Active Users</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-[#8E37EB]">50k+</p>
                <p className="text-xs text-gray-500">Tasks Completed</p>
              </div>
            </div>
          </div>

          {/* Right Column - Preview / CTA */}
          <div className="flex flex-col">
            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
              <img
                src="https://res.cloudinary.com/dcx41bmth/image/upload/v1773862114/image_2026-03-18_19-38-42_nwpvsc.png"
                alt="Project dashboard preview"
                className="rounded-md shadow-sm w-full h-auto"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Interactive dashboard • Real‑time updates
              </p>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleRedirect}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="w-5 h-5" />
                Open AI Project Hub
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="border-t border-gray-100 px-8 py-4 bg-gray-50/50 text-center text-sm text-gray-500">
          ✨ Powered by Cognify – Experience the future of project management
        </div>
      </div>
    </div>
  );
};

// Reusable feature item component
const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0">
      <div className="p-2 bg-purple-50 rounded-lg">
        <Icon className="w-5 h-5 text-[#8E37EB]" />
      </div>
    </div>
    <div>
      <h3 className="font-medium text-slate-700">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default AIProjects;