import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Pricing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] px-6 py-20">
      
      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl p-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-slate-800 text-[40px] font-bold bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-transparent bg-clip-text">
            Upgrade Your Plan 🚀
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mt-2">
            Unlock premium AI tools and boost your productivity.  
            Choose a plan that fits your workflow.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="mt-12">
          <PricingTable />
        </div>

      </div>
    </div>
  );
};

export default Pricing;