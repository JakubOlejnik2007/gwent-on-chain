import { useEffect, useState } from "react";

import { useActor } from "../../ic/Actors";
import { useAccount } from "wagmi";
import AddressPill from "../AddressPill";
import PrincipalPill from "../PrincipalPill";
import { useSiweIdentity } from "ic-use-siwe-identity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function NoProfileMessage() {
  const { actor } = useActor();
  const { address } = useAccount();
  const { identity } = useSiweIdentity();

  const [hasProfile, setHasProfile] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!actor) return;
      const response = await actor.get_my_profile();
      if (response && "Ok" in response) {
        if (response.Ok.name === "No Name") {
          setHasProfile(false);
        }
      } else {
        setHasProfile(false);
      }
      setLoading(false);
    })();
  }, [actor]);

  if (loading || hasProfile) return null;

  return (
    <div className="w-full max-w-2xl border-emerald-700/50 border-[1px] bg-emerald-900/50 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
      <div className="flex flex-col items-center w-full gap-10 py-8 md:px-8">
        <div className="text-2xl font-bold">Welcome!</div>
        <div className="text-lg leading-loose text-center">
          Jesteś zalogowy i połączyłeś się między adresem Ethereum a Internet Computer Identity.
        </div>
        <div>
          <AddressPill
            address={address}
            className="inline-block bg-emerald-800"
          />
          <FontAwesomeIcon
            className="w-5 h-5 mx-3 text-emerald-500"
            icon={faLeftRight}
          />
          <PrincipalPill
            className="inline-block bg-emerald-800 "
            principal={identity?.getPrincipal().toString()}
          />
        </div>
        <div className="text-lg">Teraz zapisz swój profil</div>
      </div>
    </div>
  );
}
