
// import video from '../../public/videos/brand-system-diagram.mp4';

export default function BrandSystemSection() {



  return (
    <section className="w-full  bg-[#f7f7f7] px-[8%] py-20 flex flex-col justify-center gap-20 text-[#1e1e1e]">

      {/* Top */}
      <div className="text-center">
        <p className="text-[14px] tracking-[3px] leading-[2] uppercase text-[#7a7a7a]">
          The <span className="font-bold text-black">STRATEGIC</span> depth of
          a consultancy.
          <br />
          The <span className="font-bold text-black">CREATIVE</span> pulse of a
          studio.
        </p>
      </div>

      {/* Middle */}
      <div className="flex items-center justify-center gap-24 flex-wrap">

        {/* Diagram */}
        <div className="relative w-[350px] h-[320px]">

          <div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover border-[1px] border-[#ccc] scale-110"
              src="/videos/AmplifyBanner.mp4"
            >
              {/* <source
                src="/videos/AmplifyBanner.mp4"
                type="video/mp4"
              /> */}
            </video>
          </div>

          {/* Boxes */}
          {/* <div className="absolute w-[150px] h-[120px] left-0 top-0 bg-[#cfcfcf]" />

          <div className="absolute w-[120px] h-[150px] left-[40px] top-[120px] bg-[#cfcfcf]" />

          <div className="absolute w-[140px] h-[120px] left-[140px] top-[40px] bg-[#cfcfcf]" /> */}

          {/* Circle */}
          {/* <div className="absolute w-[90px] h-[90px] rounded-full left-[105px] top-[75px] bg-[rgba(132,255,236,0.5)] backdrop-blur-sm" /> */}

          {/* Labels */}
          {/* <span className="absolute left-0 top-[130px] text-[11px] tracking-[2px] font-bold">
            CULTURE
          </span> */}

          {/* <span className="absolute left-[35px] bottom-0 text-[11px] tracking-[2px] font-bold">
            COMMUNICATION
          </span> */}

          {/* <span className="absolute left-[180px] top-[165px] text-[11px] tracking-[2px] font-bold">
            IMPACT
          </span> */}
        </div>

        {/* Text */}
        <div className="max-w-[400px]">
          <p className="text-[16px] leading-[2] tracking-[0.5px] text-[#666]">
            Operating at the intersection of culture, communication &
            commercial impact, we build modern brand systems designed to move
            audiences & businesses forward.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center">
        <h3 className="text-[14px] tracking-[4px] mb-5">
          BRAND SYSTEMS
        </h3>

        <p className="text-[18px] leading-[2] tracking-[1px] text-[#555]">
          Built For The Way People
          <br />
          <span className="font-bold text-black">
            DISCOVER, ENGAGE & DECIDE.
          </span>
        </p>
      </div>
    </section>
  );
}