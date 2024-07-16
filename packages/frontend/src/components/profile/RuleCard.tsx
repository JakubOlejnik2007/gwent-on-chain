import React from 'react';
import { RuleCardProps } from './gwentRules.helper';

const RuleCard = ({ruleNum, abstract, content}: RuleCardProps) => {
    return (
        <div className="flex flex-col items-center gap-5 p-5 border w-44 rounded-xl border-zinc-700 bg-zinc-800">
            <p className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
              {ruleNum}
            </p>
            <p className="w-32 font-bold text-center overflow-clip whitespace-nowrap overflow-ellipsis">
                {abstract}
            </p>
            <p className="w-32 text-center overflow-clip overflow-ellipsis">
                {content}
            </p>
        </div>
    )
}

export default RuleCard;