export default function WelcomeScreen() {
  return (
    <div id="welcome" className="flex flex-col h-screen overflow-hidden">
      <header className="h-32 w-full bg-blue-dark" />

      <h1
        className="h-full w-full flex items-center justify-center text-6xl italic font-bold text-white relative z-10"
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          background: `
        /* 1. The White Glare (Top Left) */
        radial-gradient(circle at 12% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 35%),
        
        /* 2. Top Border: Linear gradient of whites fading at the ends */
        linear-gradient(to right, transparent, rgba(255,255,255,0.8) 50%, transparent) top / 100% 3px no-repeat,
        
        /* 3. Bottom Border: Linear gradient with orange fading at the ends */
        linear-gradient(to right, transparent, #ef9122 50%, transparent) bottom / 100% 3px no-repeat,
        
        /* 4. The Main Blue Background Gradient */
        linear-gradient(to bottom, #4b6eb7 0%, #5a7edc 50%, #4b6eb7 100%)
      `,
        }}
      >
        welcome
      </h1>

      <footer className="h-32 w-full bg-blue-dark" />
    </div>
  )
}
