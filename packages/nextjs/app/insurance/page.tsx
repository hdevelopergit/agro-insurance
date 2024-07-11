"use client";

import { useState } from "react";
import { NextPage } from "next";
import { parseEther } from "viem";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Insurance: NextPage = () => {
  // Contract Write Action
  const { writeContractAsync: writeInsuranceAsync } = useScaffoldWriteContract("Insurance");

  // Contract Read Action
  const { data: unixDate } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getCurrentDate",
    watch: true,
  });

  const region = [
    ["region1", "Mercosur", 0, "September-May"],
    ["region2", "USA", 0, "April-November"],
    ["region3", "China", 0, "May-November"],
    ["region4", "EU", 0, "April-October"],
    ["region5", "Canada", 0, "May-October"],
  ];

  //I've commented out because didn't pass eslint
  // for (var i = 0; i < 5; i++) {
  //   const { data: rainRegion } = useScaffoldReadContract({
  //     contractName: "Insurance",
  //     functionName: "getMm",
  //     args: [String(region[i][0])],
  //   });
  //   region[i][2] = Number(rainRegion);
  // }

  const { data: rainRegion } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getMm",
    args: [String(region[0][0])],
  });
  region[0][2] = Number(rainRegion);

  const { data: rainRegion2 } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getMm",
    args: [String(region[1][0])],
  });
  region[1][2] = Number(rainRegion2);

  const { data: rainRegion3 } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getMm",
    args: [String(region[2][0])],
  });
  region[2][2] = Number(rainRegion3);

  const { data: rainRegion4 } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getMm",
    args: [String(region[3][0])],
  });
  region[3][2] = Number(rainRegion4);

  const { data: rainRegion5 } = useScaffoldReadContract({
    contractName: "Insurance",
    functionName: "getMm",
    args: [String(region[4][0])],
  });
  region[4][2] = Number(rainRegion5);

  // functions for list box
  const [location, setLocation] = useState("region1");
  const [locationRain, setLocationRain] = useState("region1");
  const [rain, setRain] = useState(BigInt(0));

  // Build "current" date. Can be real or changed for testing purposes.
  const unixDateTmp = Number(unixDate) * 1000;
  const date = new Date(Number(unixDateTmp));
  const day = String(date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  const month = String(
    Number(date.getMonth() + 1) < 10 ? "0" + Number(date.getMonth() + 1) : Number(date.getMonth() + 1),
  );
  const year = String(date.getFullYear());
  const formattedDate = day + "-" + month + "-" + year + " (dd-mm-yyyy)";

  return (
    <>
      <div className="flex items-center flex-col flex-grow w-full px-4 gap-12 pt-10">
        <div className="flex flex-col items-center space-y-8 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-lg">
          <div className="flex items-center flex-col flex-grow pt-5">
            <div className="px-5">
              <h1 className="text-center">
                <span className="block text-2xl font-bold">Agro-Insurance (insured)</span>
              </h1>
            </div>
            <div className="pt-3">
              <p className="text-lg mt-0 mb-1 font-semibold">Today is: {formattedDate}</p>
            </div>
            <div className="pt-3">
              <p className="text-lg mt-0 mb-1 font-semibold">Select a region:</p>
              <div className="flex flex-row mx-auto">
                <div className="flex border-2 border-base-300 bg-base-200 rounded-full text-accent">
                  <select
                    className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  >
                    {region.map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pl-6">
                  {region
                    .filter(([id]) => id == location)
                    .map(([id, , , campaign]) => (
                      <span key={id}>
                        <b>Campaign:</b> {campaign} {year}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="pt-3">
              <button
                className="btn btn-primary uppercase"
                onClick={async () => {
                  try {
                    await writeInsuranceAsync({
                      functionName: "payInsuranceFee",
                      value: parseEther("0.01"),
                      args: [location],
                    });
                  } catch (err) {
                    console.error("Error calling payInsuranceFee function", err);
                  }
                }}
              >
                💸 Pay fee! (0.01 eth)
              </button>
            </div>
            <div className="pt-3">
              <button
                className="btn btn-primary uppercase"
                onClick={async () => {
                  try {
                    await writeInsuranceAsync({
                      functionName: "collectInsurance",
                    });
                  } catch (err) {
                    console.error("Error calling collectInsurance function", err);
                  }
                }}
              >
                💸 Collect insurance! (Fee * 10 = 0.1 eth)
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-8 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 w-full max-w-lg">
          <div className="flex items-center flex-col flex-grow pt-5">
            <div className="px-5">
              <h1 className="text-center">
                <span className="block text-2xl font-bold">Agro-Insurance (owner)</span>
              </h1>
            </div>
            <div className="pt-5">
              <p className="text-lg mt-0 mb-1 font-semibold">Enter total rain per campaign/region:</p>
              <div className="flex flex-row mx-auto mt-5">
                <div className="flex border-2 border-base-300 bg-base-200 rounded-full text-accent">
                  <select
                    className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                    value={locationRain}
                    onChange={e => setLocationRain(e.target.value)}
                  >
                    {region.map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-20 pl-2">
                  <InputBase value={rain} onChange={e => setRain(e)} />
                </div>
              </div>
            </div>
            <div className="pt-3">
              <button
                className="btn btn-primary uppercase"
                onClick={async () => {
                  try {
                    await writeInsuranceAsync({
                      functionName: "enterMm",
                      args: [locationRain, rain],
                    });
                  } catch (err) {
                    console.error("Error calling enterMm function", err);
                  }
                }}
              >
                💦 Save rain
              </button>
            </div>
            <div className="pt-10">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary text-lg">Region </th>
                    <th className="bg-primary text-lg">Rain(mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {region.map(([id, name, rainTable]) => (
                    <tr key={id}>
                      <td className="text-left text-lg">{name}</td>
                      <td className="text-right text-lg">{rainTable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>{" "}
          {/*flex items-center */}
        </div>
      </div>
    </>
  );
};

export default Insurance;
