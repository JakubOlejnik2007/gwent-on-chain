import React from 'react';
import { gwentRules } from './gwentRules.helper';
import RuleCard from './RuleCard';


const GwentRules = () => {
    return (
        <div className="w-full max-w-4xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
          <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
            <div className="text-2xl font-bold">Podstawowe zasady gry</div>
            <div className="flex items-stretch justify-center flex-wrap gap-5">
                {gwentRules.map((rule, index) => <RuleCard key={index} {...rule} />)}
            </div>
          </div>
        </div>
      );
}

export default GwentRules;