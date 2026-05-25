import Image from 'next/image';

export default function RPPBanner() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(13,30,107,0.12)]">
          <Image
            src="/RPP-MIC.jpg"
            alt="MIC — Distribuidor Oficial de RPP TV en Perú"
            width={1240}
            height={400}
            className="w-full h-auto block"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
