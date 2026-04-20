import NeonBackground from "@/components/neon-vault/NeonBackground";
import NeonHero from "@/components/neon-vault/NeonHero";
import NeonSkills from "@/components/neon-vault/NeonSkills";
import NeonWork from "@/components/neon-vault/NeonWork";

// Adding ': { userData: any }' fixes the type error
export default function NeonVault({ userData }: { userData: any }) {
  return (
    <main className="relative min-h-screen bg-[#020204] text-slate-200">
      <NeonBackground />
      
      <div className="relative z-10 container mx-auto max-w-4xl px-6 py-20">
        {/* Using optional chaining '?.' prevents crashes if data is missing */}
        <NeonHero 
          name={userData?.personalInfo?.name || "Khadija"} 
          title={userData?.personalInfo?.title || "Computer Science Specialist"} 
        />
        
        <div className="mt-20 space-y-24">
          <NeonSkills skills={userData?.skills || []} />
          <NeonWork experience={userData?.experience || []} />
        </div>
      </div>
    </main>
  );
}