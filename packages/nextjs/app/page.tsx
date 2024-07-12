"use client";

import Image from "next/image";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Agro-Insurance</span>
          </h1>
          <div className="flex items-center flex-col flex-grow my-10">
            <Image src="/farm.png" width="727" height="231" alt="farm" className="rounded-xl border-4 border-primary" />
          </div>
          {/* <div className="mx-96 px-40"> */}
          <div className="max-w-3xl">
            <p className="text-center text-lg">
              <b className="text-xl">Agro-Insurance</b> is an app where you can insure your soyabeans against the wether
              conditions. During the campaign of soyabeans it is expected to rain between <b>500</b> and <b>800</b> mm
              of water. If this condition is not fulfilled, you can collect 10x the fee you paid.
            </p>
            <p className="text-left text-lg mx-10">
              <span className="block text-xl mb-2 font-bold">The steps are:</span>
              🔅 Select the region where you produce your soyabeans
              <br />
              🔅 Pay the Fee
              <br />
              🔅 When the campaign for your region ends, and if the rain was bad you can collect the insurance.
              <br />
            </p>
            <p className="text-left text-lg">
              <span className="block mb-2 font-bold">Important note:</span>
              🔅 You can see the mm of rain fallen in the contract&apos;s owner section.
              <br />
              🔅 To avoid wait the dates and get bored :P, there is a &quot;testing&quot; function (called
              setCurrentDate) which you can use to change the date and play accordingly. <br />
              🔅 You have to pass the date in unix format and this is only for testing purposes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
