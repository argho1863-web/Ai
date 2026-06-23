export const HUD = ({ controls }: { controls: any }) => {
  const { setControl } = controls;

  return (
    <div className="hud-container">
      <div className="stats">
        <h1>F1 3D Race</h1>
        <p>Use WASD or buttons below</p>
      </div>

      <div className="mobile-controls">
        <div className="steering">
          <button
            onMouseDown={() => setControl('left', true)}
            onMouseUp={() => setControl('left', false)}
            onTouchStart={(e) => { e.preventDefault(); setControl('left', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControl('left', false); }}
          >L</button>
          <button
            onMouseDown={() => setControl('right', true)}
            onMouseUp={() => setControl('right', false)}
            onTouchStart={(e) => { e.preventDefault(); setControl('right', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControl('right', false); }}
          >R</button>
        </div>

        <div className="pedals">
          <button
            className="brake"
            onMouseDown={() => setControl('backward', true)}
            onMouseUp={() => setControl('backward', false)}
            onTouchStart={(e) => { e.preventDefault(); setControl('backward', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControl('backward', false); }}
          >BRAKE</button>
          <button
            className="gas"
            onMouseDown={() => setControl('forward', true)}
            onMouseUp={() => setControl('forward', false)}
            onTouchStart={(e) => { e.preventDefault(); setControl('forward', true); }}
            onTouchEnd={(e) => { e.preventDefault(); setControl('forward', false); }}
          >GAS</button>
        </div>
      </div>

      <button className="reset-btn" onClick={() => {
          setControl('reset', true);
          setTimeout(() => setControl('reset', false), 100);
      }}>RESET</button>
    </div>
  );
};
